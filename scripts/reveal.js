#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { parseArgs } = require("node:util");
const { spawn } = require("node:child_process");
const { parse } = require("@babel/parser");

const DEFAULTS = { order: "inline", coarse: false, arrays: true, keepRoot: true, interval: 400, perLine: 100 };
const ORDERS = ["inline", "styled", "document"];
const BACKUP_FILE = path.join(".reveal-backup", "last.json");
const LABEL_MAX = 60;
const SAFE_ARRAY_METHODS = new Set([
  "map", "forEach", "filter", "flatMap", "reduce", "some", "every", "length",
  "slice", "concat", "join", "includes", "entries", "keys", "values",
]);
const SKIP_KEYS = new Set([
  "type", "loc", "start", "end", "extra", "leadingComments", "trailingComments",
  "innerComments", "comments", "tokens", "range",
]);

// ---------------------------------------------------------------------------
// AST helpers
// ---------------------------------------------------------------------------

function parseSource(source, filename) {
  const plugins = ["typescript"];
  if (!/\.ts$/.test(filename || "")) plugins.push("jsx");
  return parse(source, { sourceType: "module", plugins, attachComment: false });
}

function isNode(value) {
  return Boolean(value) && typeof value === "object" && typeof value.type === "string";
}

function walk(node, visit, parents, parent = null) {
  parents.set(node, parent);
  visit(node, parent);
  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key)) continue;
    const value = node[key];
    if (Array.isArray(value)) {
      for (const child of value) if (isNode(child)) walk(child, visit, parents, node);
    } else if (isNode(value)) {
      walk(value, visit, parents, node);
    }
  }
}

function isJsxParent(node) {
  return Boolean(node) && (node.type === "JSXElement" || node.type === "JSXFragment");
}

function unwrapTs(node) {
  const wrappers = new Set(["TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression"]);
  while (node && wrappers.has(node.type)) node = node.expression;
  return node;
}

function containsJsx(node) {
  let found = false;
  walk(node, (n) => { if (n.type === "JSXElement" || n.type === "JSXFragment") found = true; }, new Map());
  return found;
}

function propName(prop, source) {
  const key = prop.key;
  if (prop.computed) return source.slice(key.start, key.end);
  if (key.type === "Identifier") return key.name;
  if (key.type === "StringLiteral") return key.value;
  if (key.type === "NumericLiteral") return String(key.value);
  return source.slice(key.start, key.end);
}

function snippet(source, start, end, wholeRange = false) {
  let text = source.slice(start, end);
  if (!wholeRange) text = text.split("\n")[0];
  text = text.replace(/\s+/g, " ").trim();
  return text.length > LABEL_MAX ? `${text.slice(0, LABEL_MAX - 1)}…` : text;
}

function isStyleAttr(attr) {
  return attr.type === "JSXAttribute" && attr.name.type === "JSXIdentifier" && /style$/i.test(attr.name.name) && Boolean(attr.value);
}

function lineTable(source) {
  const starts = [0];
  for (let i = 0; i < source.length; i++) if (source[i] === "\n") starts.push(i + 1);
  return starts;
}

function posToLineCol(starts, pos) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= pos) lo = mid;
    else hi = mid - 1;
  }
  return { line: lo + 1, col: pos - starts[lo] };
}

function withTrailingComma(source, end) {
  let e = end;
  while (e < source.length && (source[e] === " " || source[e] === "\t")) e++;
  return source[e] === "," ? e + 1 : end;
}

function arrayIsSafe(name, declarator, nodes, parents) {
  for (const node of nodes) {
    if (node.type !== "Identifier" || node.name !== name) continue;
    const parent = parents.get(node);
    if (!parent) continue;
    if (parent === declarator && parent.id === node) continue;
    if (parent.type === "ObjectProperty" && parent.key === node && !parent.computed) continue;
    if ((parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression") && parent.property === node && !parent.computed) continue;
    if (parent.type.startsWith("TS")) continue;
    if (/^(Import|Export)\w*Specifier$/.test(parent.type)) continue;

    const grand = parents.get(parent);
    const safeMember =
      (parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression") &&
      parent.object === node && !parent.computed &&
      parent.property.type === "Identifier" && SAFE_ARRAY_METHODS.has(parent.property.name);
    const safeProp = parent.type === "JSXExpressionContainer" && grand && grand.type === "JSXAttribute";
    const safeSpread = parent.type === "SpreadElement" && grand && grand.type === "ArrayExpression";
    if (!safeMember && !safeProp && !safeSpread) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Analysis: turn one source file into a tree of revealable units
// ---------------------------------------------------------------------------

function analyze(source, filename, options) {
  const opts = { ...DEFAULTS, ...options };
  const ast = parseSource(source, filename);
  const parents = new Map();
  const nodes = [];
  walk(ast, (n) => nodes.push(n), parents);

  const starts = lineTable(source);
  const units = [];
  const add = (kind, start, end, mode, label, extra = {}) => {
    const { line, col } = posToLineCol(starts, start);
    units.push({ id: `${kind}:${line}:${col}`, kind, start, end, mode, label, line, ...extra });
  };

  const styleVars = new Set();
  const styleSheets = [];
  for (const node of nodes) {
    const c = node.type === "CallExpression" ? node.callee : null;
    if (
      c && c.type === "MemberExpression" &&
      c.object.type === "Identifier" && c.object.name === "StyleSheet" &&
      c.property.type === "Identifier" && c.property.name === "create" &&
      node.arguments[0] && node.arguments[0].type === "ObjectExpression"
    ) {
      const parent = parents.get(node);
      const varName = parent && parent.type === "VariableDeclarator" && parent.id.type === "Identifier" ? parent.id.name : "styles";
      styleVars.add(varName);
      styleSheets.push({ varName, object: node.arguments[0] });
    }
  }

  for (const { varName, object } of styleSheets) {
    for (const prop of object.properties) {
      if (prop.type !== "ObjectProperty") continue;
      const key = propName(prop, source);
      add("style", prop.start, withTrailingComma(source, prop.end), "remove", `${varName}.${key}`, { styleVar: varName, styleKey: key });
      if (opts.coarse || prop.value.type !== "ObjectExpression") continue;
      for (const p of prop.value.properties) {
        if (p.type !== "ObjectProperty") continue;
        add("prop", p.start, withTrailingComma(source, p.end), "remove", `${key}.${propName(p, source)}`);
      }
    }
  }

  const arrays = new Map();
  if (opts.arrays) {
    for (const stmt of ast.program.body) {
      const decl =
        stmt.type === "VariableDeclaration" ? stmt
        : stmt.type === "ExportNamedDeclaration" && stmt.declaration && stmt.declaration.type === "VariableDeclaration" ? stmt.declaration
        : null;
      if (!decl || decl.kind !== "const") continue;
      for (const d of decl.declarations) {
        if (d.id.type !== "Identifier") continue;
        const arr = unwrapTs(d.init);
        if (!arr || arr.type !== "ArrayExpression" || arr.elements.length === 0) continue;
        if (arr.elements.some((el) => !el || el.type === "SpreadElement")) continue;
        if (!arrayIsSafe(d.id.name, d, nodes, parents)) continue;
        arrays.set(d.id.name, []);
        arr.elements.forEach((el, i) => {
          add("item", el.start, withTrailingComma(source, el.end), "remove", `${d.id.name}[${i}]`, { array: d.id.name });
        });
      }
    }
  }

  const merged = new Set();
  for (const node of nodes) {
    const parent = parents.get(node);
    if (node.type === "JSXElement" || node.type === "JSXFragment") {
      let mode = null;
      if (isJsxParent(parent)) {
        mode = "remove";
      } else if (parent && parent.type === "JSXExpressionContainer" && isJsxParent(parents.get(parent))) {
        mode = null;
      } else if (parent && (parent.type === "ReturnStatement" || parent.type === "ConditionalExpression" || parent.type === "VariableDeclarator")) {
        mode = "null";
      } else if (parent && parent.type === "ArrowFunctionExpression" && parent.body === node) {
        const grand = parents.get(parent);
        const isCallback = grand && (grand.type === "CallExpression" || grand.type === "OptionalCallExpression") && grand.arguments.includes(parent);
        if (!isCallback) mode = "null";
      } else if (parent && parent.type === "JSXExpressionContainer" && parents.get(parent) && parents.get(parent).type === "JSXAttribute") {
        mode = "null";
      }
      if (mode) {
        const label = node.type === "JSXFragment" ? "<>" : snippet(source, node.openingElement.start, node.openingElement.end, true);
        add("jsx", node.start, node.end, mode, label);
        const kids = node.children.filter((c) =>
          !(c.type === "JSXText" && c.value.trim() === "") &&
          !(c.type === "JSXExpressionContainer" && c.expression.type === "JSXEmptyExpression"));
        if (kids.length === 1 && (kids[0].type === "JSXText" || (kids[0].type === "JSXExpressionContainer" && !containsJsx(kids[0])))) {
          merged.add(kids[0]);
        }
      }
      const attrs = node.type === "JSXElement" ? node.openingElement.attributes : [];
      for (const attr of attrs) {
        if (!isStyleAttr(attr) || opts.coarse || attr.value.type !== "JSXExpressionContainer") continue;
        const expr = attr.value.expression;
        const objects =
          expr.type === "ObjectExpression" ? [expr]
          : expr.type === "ArrayExpression" ? expr.elements.filter((e) => e && e.type === "ObjectExpression")
          : [];
        for (const obj of objects) {
          for (const p of obj.properties) {
            if (p.type !== "ObjectProperty") continue;
            add("prop", p.start, withTrailingComma(source, p.end), "remove", snippet(source, p.start, p.end));
          }
        }
      }
    } else if (node.type === "JSXExpressionContainer" && isJsxParent(parent) && node.expression.type !== "JSXEmptyExpression" && !merged.has(node)) {
      add("expr", node.start, node.end, "remove", snippet(source, node.start, node.end));
    } else if (node.type === "JSXText" && isJsxParent(parent) && node.value.trim() !== "" && !merged.has(node)) {
      const raw = source.slice(node.start, node.end);
      const lead = raw.length - raw.trimStart().length;
      const trail = raw.length - raw.trimEnd().length;
      add("text", node.start + lead, node.end - trail, "remove", snippet(source, node.start + lead, node.end - trail, true));
    }
  }

  const link = (list) => {
    list.sort((a, b) => a.start - b.start || b.end - a.end);
    for (const name of arrays.keys()) arrays.set(name, []);
    const byId = new Map();
    const roots = [];
    const stack = [];
    for (const u of list) {
      if (byId.has(u.id)) throw new Error(`${filename}: duplicate unit id ${u.id}`);
      byId.set(u.id, u);
      while (stack.length && stack[stack.length - 1].end <= u.start) stack.pop();
      u.parent = stack.length ? stack[stack.length - 1] : null;
      u.children = [];
      u.arrayRefs = [];
      u.styleRefs = [];
      (u.parent ? u.parent.children : roots).push(u);
      stack.push(u);
      if (u.kind === "item") arrays.get(u.array).push(u);
    }

    const styleUnits = new Map(list.filter((u) => u.kind === "style").map((u) => [`${u.styleVar}.${u.styleKey}`, u]));

    const deepest = (pos) => {
      let current = null;
      let candidates = roots;
      outer: while (true) {
        for (const u of candidates) {
          if (pos >= u.start && pos < u.end) {
            current = u;
            candidates = u.children;
            continue outer;
          }
        }
        return current;
      }
    };

    for (const node of nodes) {
      const parent = parents.get(node);
      if (node.type === "Identifier" && arrays.has(node.name)) {
        const isDeclOrKey =
          (parent.type === "VariableDeclarator" && parent.id === node) ||
          (parent.type === "ObjectProperty" && parent.key === node && !parent.computed) ||
          ((parent.type === "MemberExpression" || parent.type === "OptionalMemberExpression") && parent.property === node && !parent.computed);
        if (isDeclOrKey) continue;
        const u = deepest(node.start);
        if (u && !u.arrayRefs.includes(node.name)) u.arrayRefs.push(node.name);
      } else if (
        node.type === "MemberExpression" && !node.computed &&
        node.object.type === "Identifier" && styleVars.has(node.object.name) && node.property.type === "Identifier"
      ) {
        const u = deepest(node.start);
        if (u) u.styleRefs.push(`${node.object.name}.${node.property.name}`);
      }
    }

    return { units: list, roots, byId, arrays, styleUnits, options: opts };
  };

  let analysis = link(units);
  if (opts.keepRoot) {
    const keep = new Set();
    const keepStyle = (key) => {
      const style = analysis.styleUnits.get(key);
      if (!style) return;
      keep.add(style);
      for (const p of style.children) keep.add(p);
    };
    for (const root of analysis.roots) {
      if (root.kind !== "jsx" || root.mode !== "null") continue;
      keep.add(root);
      root.styleRefs.forEach(keepStyle);
      for (const child of root.children) if (child.kind === "prop") keep.add(child);
    }
    if (keep.size) analysis = link(units.filter((u) => !keep.has(u)));
  }
  return analysis;
}

// ---------------------------------------------------------------------------
// Ordering and rendering
// ---------------------------------------------------------------------------

function orderUnits(analysis) {
  const { roots, units, arrays, styleUnits, options } = analysis;
  const groups = [];
  const seen = new Set();
  const take = (u) => {
    if (seen.has(u.id)) return false;
    seen.add(u.id);
    return true;
  };
  const emit = (u) => { if (take(u)) groups.push([u]); };
  const styleWithProps = (key) => {
    const style = styleUnits.get(key);
    if (!style || seen.has(style.id)) return [];
    return [style, ...style.children].filter(take);
  };
  const visit = (u) => {
    if (options.order === "styled") {
      if (take(u)) {
        const group = [u];
        for (const c of u.children) if (c.kind === "prop" && take(c)) group.push(c);
        for (const key of u.styleRefs) group.push(...styleWithProps(key));
        groups.push(group);
      }
    } else {
      emit(u);
    }
    for (const name of u.arrayRefs) for (const item of arrays.get(name)) emit(item);
    if (options.order === "inline") for (const key of u.styleRefs) for (const s of styleWithProps(key)) groups.push([s]);
    for (const c of u.children) if (!seen.has(c.id)) visit(c);
  };
  for (const r of roots) {
    if (r.kind === "item") continue;
    if (r.kind === "style" && options.order !== "document") continue;
    visit(r);
  }
  for (const u of units) emit(u);
  return groups;
}

function hasHiddenAncestor(unit, revealed) {
  for (let p = unit.parent; p; p = p.parent) if (!revealed.has(p.id)) return true;
  return false;
}

function renderFile(analysis, source, revealed) {
  const mask = new Uint8Array(source.length).fill(1);
  const inserts = new Map();
  for (const u of analysis.units) {
    if (revealed.has(u.id) || hasHiddenAncestor(u, revealed)) continue;
    let end = u.end;
    if (u.mode === "null") inserts.set(u.start, "null");
    else if (source[end] === " " && /[ [({]/.test(source[u.start - 1] || "")) end++;
    for (let i = u.start; i < end; i++) mask[i] = 0;
  }

  const out = [];
  const lineMap = new Map();
  let lineStart = 0;
  let originalLine = 0;
  while (true) {
    let lineEnd = source.indexOf("\n", lineStart);
    if (lineEnd === -1) lineEnd = source.length;
    let text = "";
    let touched = false;
    for (let i = lineStart; i < lineEnd; i++) {
      if (inserts.has(i)) text += inserts.get(i);
      if (mask[i]) text += source[i];
      else touched = true;
    }
    const newlineMasked = lineEnd < source.length && mask[lineEnd] === 0;
    const dropped = (touched || newlineMasked) && text.trim() === "";
    if (!dropped) {
      if (touched) text = text.replace(/[ \t]+$/, "");
      lineMap.set(originalLine, out.length);
      out.push(text);
    }
    originalLine++;
    if (lineEnd === source.length) break;
    lineStart = lineEnd + 1;
  }
  return { text: out.join("\n"), lineMap };
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

function planOptions(plan) {
  const { order, coarse, arrays, keepRoot } = plan.options;
  return { order, coarse, arrays, keepRoot };
}

const analysisCache = new Map();
function analysisFor(plan, index, source) {
  const key = JSON.stringify([plan.files[index], planOptions(plan), source]);
  if (!analysisCache.has(key)) analysisCache.set(key, analyze(source, plan.files[index], planOptions(plan)));
  return analysisCache.get(key);
}

function buildPlan(files, options = {}) {
  const opts = { ...DEFAULTS, ...options };
  const plan = {
    version: 1,
    options: { order: opts.order, coarse: opts.coarse, arrays: opts.arrays, keepRoot: opts.keepRoot },
    interval: opts.interval,
    perLine: opts.perLine,
    files: files.map((f) => f.path),
    steps: [],
  };
  files.forEach((f, index) => {
    const analysis = analysisFor(plan, index, f.source);
    for (const group of orderUnits(analysis)) plan.steps.push({ file: index, units: group.map((u) => u.id), label: group[0].label });
  });
  return plan;
}

function normalizePlan(plan, sources) {
  const known = plan.files.map((_, i) => analysisFor(plan, i, sources[i]));
  const covered = plan.files.map(() => new Set());
  for (const step of plan.steps) {
    if (!known[step.file]) throw new Error(`step "${step.label}" points at unknown file index ${step.file}`);
    for (const id of step.units) {
      if (!known[step.file].byId.has(id)) throw new Error(`unknown unit "${id}" in ${plan.files[step.file]}`);
      covered[step.file].add(id);
    }
  }
  let appended = 0;
  known.forEach((analysis, file) => {
    const missing = analysis.units.filter((u) => !covered[file].has(u.id)).map((u) => u.id);
    if (missing.length) {
      plan.steps.push({ file, units: missing, label: `(remaining ${missing.length} units of ${path.basename(plan.files[file])})` });
      appended += missing.length;
    }
  });
  return appended;
}

function revealedAt(plan, k) {
  const sets = plan.files.map(() => new Set());
  for (let i = 0; i < k && i < plan.steps.length; i++) {
    for (const id of plan.steps[i].units) sets[plan.steps[i].file].add(id);
  }
  return sets;
}

function renderState(plan, sources, k) {
  const sets = revealedAt(plan, k);
  return plan.files.map((_, i) => renderFile(analysisFor(plan, i, sources[i]), sources[i], sets[i]));
}

function stateAt(plan, sources, k) {
  return renderState(plan, sources, k).map((r) => r.text);
}

function stepDelays(plan, sources) {
  const delays = [];
  let previous = stateAt(plan, sources, 0);
  for (let k = 1; k <= plan.steps.length; k++) {
    const step = plan.steps[k - 1];
    const current = stateAt(plan, sources, k);
    const added = current[step.file].split("\n").length - previous[step.file].split("\n").length;
    delays.push(step.delay ?? plan.interval + plan.perLine * Math.max(0, added));
    previous = current;
  }
  return delays;
}

function estimateDuration(plan, sources) {
  return stepDelays(plan, sources).reduce((a, b) => a + b, 0);
}

function checkPlan(plan, sources) {
  const problems = [];
  for (let k = 0; k <= plan.steps.length; k++) {
    const texts = stateAt(plan, sources, k);
    texts.forEach((text, i) => {
      try {
        parseSource(text, plan.files[i]);
      } catch (err) {
        problems.push(`state ${k} (${k === 0 ? "skeleton" : plan.steps[k - 1].label}) breaks ${plan.files[i]}: ${err.message}`);
      }
    });
  }
  const final = stateAt(plan, sources, plan.steps.length);
  final.forEach((text, i) => {
    if (text !== sources[i]) problems.push(`final state of ${plan.files[i]} differs from the original`);
  });
  return problems;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const HELP = `reveal — replay a finished screen onto disk in small, always-valid chunks

Usage
  node scripts/reveal.js play  <file.tsx ...|plan.json> [options]
  node scripts/reveal.js plan  <file.tsx ...> [--out plan.json] [options]
  node scripts/reveal.js check <file.tsx ...|plan.json>
  node scripts/reveal.js preview <file.tsx ...|plan.json> [--step N]
  node scripts/reveal.js restore

Plan options
  --order inline|styled|document
                            inline:   element, then jump to the sheet for its style key
                                      and each property, then back for its children;
                                      reads like natural typing (default)
                            styled:   element arrives in one step together with its
                                      styles, cursor never leaves the JSX
                            document: JSX top to bottom unstyled, then the styles
  --coarse                  whole style objects instead of property by property
  --no-arrays               keep data arrays intact instead of item by item
  --reveal-root             also reveal the root element and its styles as steps
                            (default: they are part of the skeleton so the empty
                            screen already has the right background)
  --interval <ms>           base pause after every step (default ${DEFAULTS.interval})
  --per-line <ms>           extra pause per added line (default ${DEFAULTS.perLine})

Play options
  --manual                  advance with Enter/Space instead of a timer (q quits)
  --start-delay <ms>        start automatically after a countdown instead of on Enter
  --from <N>                begin at step N (the state before it is written first)
  --goto / --no-goto        scroll the editor to each new chunk (default: on). On macOS
                            this opens a vscode://file URL in the running window, so
                            nothing new is launched and focus does not change.
  --goto-scheme <name>      URL scheme of your editor: vscode (default), cursor,
                            vscode-insiders, windsurf
`;

function readSources(files) {
  return files.map((f) => fs.readFileSync(path.resolve(f), "utf8"));
}

function loadPlan(positionals, values) {
  if (!positionals.length) throw new Error("give a plan.json or one or more screen files");
  let plan;
  if (positionals.length === 1 && positionals[0].endsWith(".json")) {
    plan = JSON.parse(fs.readFileSync(path.resolve(positionals[0]), "utf8"));
    plan.options = { ...DEFAULTS, ...plan.options };
  } else {
    plan = buildPlan(
      positionals.map((p) => ({ path: p, source: fs.readFileSync(path.resolve(p), "utf8") })),
      { order: values.order, coarse: values.coarse, arrays: values.arrays, keepRoot: !values["reveal-root"], interval: numberOr(values.interval, DEFAULTS.interval), perLine: numberOr(values["per-line"], DEFAULTS.perLine) }
    );
  }
  if (values.interval !== undefined) plan.interval = Number(values.interval);
  if (values["per-line"] !== undefined) plan.perLine = Number(values["per-line"]);
  const sources = readSources(plan.files);
  const appended = normalizePlan(plan, sources);
  if (appended) console.warn(`note: ${appended} units were missing from the plan and were appended as a final step`);
  return { plan, sources };
}

function numberOr(value, fallback) {
  return value === undefined ? fallback : Number(value);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function keyReader() {
  const stdin = process.stdin;
  const interactive = Boolean(stdin.isTTY);
  if (interactive) {
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
  }
  return {
    next() {
      if (!interactive) return Promise.resolve("\r");
      return new Promise((resolve) => stdin.once("data", (d) => resolve(String(d))));
    },
    close() {
      if (interactive) {
        stdin.setRawMode(false);
        stdin.pause();
      }
    },
  };
}

function writeBackup(files, sources) {
  const payload = { time: new Date().toISOString(), files: Object.fromEntries(files.map((f, i) => [path.resolve(f), sources[i]])) };
  fs.mkdirSync(path.dirname(BACKUP_FILE), { recursive: true });
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(payload, null, 2));
}

function restoreBackup() {
  if (!fs.existsSync(BACKUP_FILE)) throw new Error(`no backup found at ${BACKUP_FILE}`);
  const payload = JSON.parse(fs.readFileSync(BACKUP_FILE, "utf8"));
  for (const [file, content] of Object.entries(payload.files)) {
    fs.writeFileSync(file, content);
    console.log(`restored ${path.relative(process.cwd(), file)}`);
  }
}

function writeIfChanged(file, text, previous) {
  if (text === previous) return;
  fs.writeFileSync(path.resolve(file), text);
}

function gotoCommand(file, line, scheme, platform = process.platform) {
  const abs = path.resolve(file);
  if (platform === "darwin") return { cmd: "open", args: ["-g", `${scheme}://file${encodeURI(abs)}:${line}`] };
  return { cmd: "code", args: ["-g", `${abs}:${line}`] };
}

let gotoDisabled = false;
function gotoLine(file, line, scheme) {
  if (gotoDisabled) return;
  const { cmd, args } = gotoCommand(file, line, scheme);
  const child = spawn(cmd, args, { stdio: "ignore", detached: true });
  child.on("error", () => {
    if (!gotoDisabled) console.warn(`warning: could not run \`${cmd}\`; --goto disabled`);
    gotoDisabled = true;
  });
  child.unref();
}

async function play(positionals, values) {
  const { plan, sources } = loadPlan(positionals, values);
  const problems = checkPlan(plan, sources);
  if (problems.length) {
    console.error(problems.join("\n"));
    throw new Error("plan is not safe to play");
  }
  const manual = Boolean(values.manual);
  const useGoto = values.goto === undefined ? true : values.goto;
  const scheme = values["goto-scheme"];
  const from = Math.max(1, Number(values.from || 1));
  const total = plan.steps.length;
  const delays = stepDelays(plan, sources);
  const remaining = delays.slice(from - 1).reduce((a, b) => a + b, 0);

  writeBackup(plan.files, sources);
  const originals = sources.slice();
  let current = renderState(plan, sources, from - 1);
  plan.files.forEach((f, i) => fs.writeFileSync(path.resolve(f), current[i].text));

  const keys = keyReader();
  let finished = false;
  const restore = () => {
    if (finished) return;
    finished = true;
    plan.files.forEach((f, i) => fs.writeFileSync(path.resolve(f), originals[i]));
    keys.close();
    console.log("\nrestored original files");
  };
  process.on("SIGINT", () => { restore(); process.exit(130); });
  process.on("SIGTERM", () => { restore(); process.exit(143); });

  const quitKeys = new Set(["q", ""]);
  const waitKey = async () => {
    const key = await keys.next();
    if (quitKeys.has(key)) { restore(); process.exit(130); }
  };

  console.log(`state ${from - 1} written: ${total - from + 1} steps to go, about ${Math.round(remaining / 1000)}s in timer mode`);
  if (useGoto && process.platform === "darwin") {
    console.log("if the editor asks whether to open the file, tick \"Allow opening local paths without asking\" and press Yes once");
  }
  if (values["start-delay"] !== undefined && !manual) {
    for (let left = Number(values["start-delay"]); left > 0; left -= 1000) {
      process.stdout.write(`\rstarting in ${Math.ceil(left / 1000)}s `);
      await sleep(Math.min(1000, left));
    }
    process.stdout.write("\n");
  } else {
    console.log(manual ? "press Enter or Space for each step, q to quit" : "press Enter to start, q to quit");
    await waitKey();
  }

  for (let k = from; k <= total; k++) {
    const step = plan.steps[k - 1];
    const next = renderState(plan, sources, k);
    const file = plan.files[step.file];
    writeIfChanged(file, next[step.file].text, current[step.file].text);
    console.log(`[${String(k).padStart(String(total).length)}/${total}] ${path.basename(file)}  ${step.label}`);
    if (useGoto) {
      const analysis = analysisFor(plan, step.file, sources[step.file]);
      const unit = analysis.byId.get(step.units[0]);
      const line = next[step.file].lineMap.get(unit.line - 1);
      if (line !== undefined) gotoLine(file, line + 1, scheme);
    }
    current = next;
    if (k === total) break;
    if (manual || step.pause) await waitKey();
    else await sleep(delays[k - 1]);
  }

  finished = true;
  keys.close();
  const mismatch = plan.files.filter((f, i) => fs.readFileSync(path.resolve(f), "utf8") !== originals[i]);
  if (mismatch.length) {
    plan.files.forEach((f, i) => fs.writeFileSync(path.resolve(f), originals[i]));
    console.log(`done; restored ${mismatch.length} file(s) that did not match the original`);
  } else {
    console.log("done; files are back to their original content");
  }
}

function main(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    allowNegative: true,
    options: {
      out: { type: "string" },
      order: { type: "string", default: DEFAULTS.order },
      coarse: { type: "boolean", default: false },
      arrays: { type: "boolean", default: true },
      "reveal-root": { type: "boolean", default: false },
      interval: { type: "string" },
      "per-line": { type: "string" },
      manual: { type: "boolean", default: false },
      "start-delay": { type: "string" },
      from: { type: "string" },
      goto: { type: "boolean" },
      "goto-scheme": { type: "string", default: "vscode" },
      step: { type: "string" },
      help: { type: "boolean", short: "h", default: false },
    },
  });
  const [command, ...rest] = positionals;
  if (values.help || !command) {
    console.log(HELP);
    return Promise.resolve();
  }
  if (!ORDERS.includes(values.order)) throw new Error(`--order must be one of ${ORDERS.join(", ")}`);

  switch (command) {
    case "plan": {
      const { plan, sources } = loadPlan(rest, values);
      const out = values.out || "reveal.plan.json";
      fs.writeFileSync(path.resolve(out), JSON.stringify(plan, null, 2));
      console.log(`${plan.steps.length} steps, about ${Math.round(estimateDuration(plan, sources) / 1000)}s in timer mode → ${out}`);
      return Promise.resolve();
    }
    case "check": {
      const { plan, sources } = loadPlan(rest, values);
      const problems = checkPlan(plan, sources);
      if (problems.length) {
        console.error(problems.join("\n"));
        process.exitCode = 1;
      } else {
        console.log(`ok: ${plan.steps.length} steps, every state parses, final state matches the original`);
      }
      return Promise.resolve();
    }
    case "preview": {
      const { plan, sources } = loadPlan(rest, values);
      const k = Number(values.step || 0);
      const texts = stateAt(plan, sources, k);
      texts.forEach((text, i) => {
        if (texts.length > 1) console.log(`===== ${plan.files[i]} =====`);
        console.log(text);
      });
      return Promise.resolve();
    }
    case "play":
      return play(rest, values);
    case "restore":
      restoreBackup();
      return Promise.resolve();
    default:
      throw new Error(`unknown command "${command}"\n${HELP}`);
  }
}

module.exports = { analyze, orderUnits, renderFile, buildPlan, normalizePlan, stateAt, estimateDuration, checkPlan, gotoCommand };

if (require.main === module) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
