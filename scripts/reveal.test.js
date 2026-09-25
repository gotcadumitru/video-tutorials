const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("@babel/parser");

const { buildPlan, stateAt, estimateDuration } = require("./reveal");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const FIXTURE = "scripts/__fixtures__/Sample.tsx";
const BADGE = "scripts/__fixtures__/Badge.tsx";
const REAL = [
  "src/navigation/screens/AppleFitness/AppleFitness.tsx",
  "src/navigation/screens/Duolingo/Duolingo.tsx",
  "src/navigation/screens/Instagram/InstagramScreen.tsx",
];

function file(rel) {
  return { path: rel, source: read(rel) };
}

function parses(text) {
  parse(text, { sourceType: "module", plugins: ["jsx", "typescript"] });
}

function allStates(plan, sources) {
  const states = [];
  for (let k = 0; k <= plan.steps.length; k++) states.push(stateAt(plan, sources, k));
  return states;
}

function kind(id) {
  return id.split(":")[0];
}

const VARIANTS = [
  { order: "styled", coarse: false },
  { order: "styled", coarse: true },
  { order: "document", coarse: false },
  { order: "document", coarse: true },
  { order: "inline", coarse: false },
  { order: "inline", coarse: true },
];

for (const rel of [FIXTURE, ...REAL]) {
  for (const opts of VARIANTS) {
    const name = `${path.basename(rel)} ${opts.order}${opts.coarse ? " coarse" : ""}`;

    test(`${name}: every intermediate state parses`, () => {
      const f = file(rel);
      const plan = buildPlan([f], opts);
      assert.ok(plan.steps.length > 5, "expected a meaningful number of steps");
      for (const state of allStates(plan, [f.source])) {
        assert.doesNotThrow(() => parses(state[0]));
      }
    });

    test(`${name}: final state is byte-identical to the original`, () => {
      const f = file(rel);
      const plan = buildPlan([f], opts);
      const final = stateAt(plan, [f.source], plan.steps.length);
      assert.equal(final[0], f.source);
    });

    test(`${name}: no state leaves a whitespace-only line behind`, () => {
      const f = file(rel);
      const plan = buildPlan([f], opts);
      const blankLines = (text) => text.split("\n").filter((l) => /^[ \t]+$/.test(l)).length;
      const allowed = blankLines(f.source);
      for (const state of allStates(plan, [f.source])) {
        assert.ok(blankLines(state[0]) <= allowed, "a removal left a whitespace-only line behind");
      }
    });

    test(`${name}: every step reveals something new`, () => {
      const f = file(rel);
      const plan = buildPlan([f], opts);
      const states = allStates(plan, [f.source]);
      for (let k = 1; k < states.length; k++) {
        assert.notEqual(states[k][0], states[k - 1][0], `step ${k} changed nothing`);
      }
    });
  }
}

test("skeleton keeps the root element and its styles so the background is right from the first frame", () => {
  const f = file(FIXTURE);
  for (const order of ["document", "inline"]) {
    const plan = buildPlan([f], { order });
    const [text] = stateAt(plan, [f.source], 0);
    assert.match(text, /return \(\n    <View style={styles\.root}>\n    <\/View>\n  \);/);
    assert.match(text, /root: {\n    flex: 1,\n    backgroundColor: "#000",\n  },/);
    const labels = plan.steps.map((s) => s.label);
    for (const kept of ["<View style={styles.root}>", "style={styles.root}", "styles.root", "root.flex", "root.backgroundColor"]) {
      assert.equal(labels.includes(kept), false, `${kept} should not be a step in ${order} order`);
    }
  }
});

test("a root with an inline style object keeps that object in the skeleton", () => {
  const source = [
    'import React from "react";',
    'import { Text, View } from "react-native";',
    "",
    "export default function Dark() {",
    "  return (",
    '    <View style={{ flex: 1, backgroundColor: "#000" }}>',
    "      <Text>Hi</Text>",
    "    </View>",
    "  );",
    "}",
    "",
  ].join("\n");
  const plan = buildPlan([{ path: "Dark.tsx", source }], { order: "document" });
  const [text] = stateAt(plan, [source], 0);
  assert.match(text, /<View style={{ flex: 1, backgroundColor: "#000" }}>\n    <\/View>/);
  assert.equal(plan.steps.length, 1);
  assert.equal(plan.steps[0].label, "<Text>");
});

test("with keepRoot false the skeleton replaces the returned root with null and empties arrays and the stylesheet", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document", keepRoot: false });
  const [text] = stateAt(plan, [f.source], 0);
  assert.match(text, /return \(\n    null\n  \);/);
  assert.match(text, /const styles = StyleSheet\.create\({\n}\);/);
  assert.match(text, /const ITEMS = \[\n\];/);
  assert.match(text, /const TABS = \[\] as const;/);
});

test("arrays only used through map or as data props are split into items, others stay intact", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  assert.deepEqual(
    labels.filter((l) => l.startsWith("ITEMS[")),
    ["ITEMS[0]", "ITEMS[1]", "ITEMS[2]"]
  );
  assert.deepEqual(labels.filter((l) => l.startsWith("TABS[")), ["TABS[0]", "TABS[1]"]);
  assert.deepEqual(labels.filter((l) => l.startsWith("FIRST[")), []);
  const [text] = stateAt(plan, [f.source], 0);
  assert.match(text, /const FIRST = \["a", "b"\];/);
});

test("array items are revealed right after the first unit that references the array", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  const mapIndex = labels.findIndex((l) => l.startsWith("{ITEMS.map("));
  assert.ok(mapIndex > 0);
  assert.deepEqual(labels.slice(mapIndex + 1, mapIndex + 4), ["ITEMS[0]", "ITEMS[1]", "ITEMS[2]"]);
});

test("document order reveals all JSX before any stylesheet key", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const kinds = plan.steps.map((s) => kind(s.units[0]));
  const lastJsx = Math.max(...kinds.map((k, i) => (["jsx", "expr", "text"].includes(k) ? i : -1)));
  const firstStyle = kinds.indexOf("style");
  assert.ok(firstStyle > lastJsx, `first style step ${firstStyle} should follow last jsx step ${lastJsx}`);
});

test("inline order reveals the element with its attributes, then its style key and properties, then its children", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "inline" });
  const labels = plan.steps.map((s) => s.label);
  assert.equal(labels.some((l) => l.startsWith("style={")), false, "style attributes are not separate steps");
  const el = labels.indexOf("<Text style={styles.title}>");
  assert.ok(el >= 0);
  assert.deepEqual(labels.slice(el + 1, el + 4), ["styles.title", "title.color", "title.fontSize"]);
  const [afterElement] = stateAt(plan, [f.source], el + 1);
  assert.match(afterElement, /<Text style={styles\.title}>Hello<\/Text>/);
  assert.doesNotMatch(afterElement, /title: {/);
  const [afterKey] = stateAt(plan, [f.source], el + 2);
  assert.match(afterKey, /title: { },/);
  const values = labels.indexOf("<Text style={styles.value}>");
  assert.deepEqual(labels.slice(values + 1, values + 4), ["styles.value", "value.fontSize", "5.2"]);
});

test("inline is the default order", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f]);
  assert.equal(plan.options.order, "inline");
});

test("an element whose only child is text is revealed together with that text", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  assert.equal(labels.includes("Hello"), false);
  const idx = labels.indexOf("<Text style={styles.title}>");
  assert.ok(idx >= 0);
  const [text] = stateAt(plan, [f.source], idx + 1);
  assert.match(text, /<Text style={styles\.title}>Hello<\/Text>/);
});

test("text and element siblings on one line are revealed separately", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  assert.ok(labels.includes("5.2"));
  assert.ok(labels.includes("<Text style={styles.unit}>"));
  const idx = labels.indexOf("5.2");
  const [text] = stateAt(plan, [f.source], idx + 1);
  assert.match(text, /<Text style={styles\.value}>\n        5\.2\n      <\/Text>/);
});

test("ternary branches become separate null-replaced units", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  const idx = labels.findIndex((l) => l.startsWith("{open ?"));
  assert.ok(idx > 0);
  const [text] = stateAt(plan, [f.source], idx + 1);
  assert.match(text, /{open \? null : null}/);
});

test("a && block is one unit together with its wrapping element", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  assert.equal(labels.includes("<View style={styles.card}>"), false);
  const idx = labels.findIndex((l) => l.startsWith("{open && ("));
  assert.ok(idx > 0);
  const [text] = stateAt(plan, [f.source], idx + 1);
  assert.match(text, /{open && \(\n        <View style={styles\.card}>\n        <\/View>\n      \)}/);
});

test("map callback root is hidden with its container and children fill in afterwards", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  assert.equal(labels.includes("<Text key={item.id} style={styles.row}>"), false);
  const idx = labels.findIndex((l) => l.startsWith("{ITEMS.map("));
  const [text] = stateAt(plan, [f.source], idx + 1);
  assert.match(text, /<Text key={item\.id} style={styles\.row}>\n          <\/Text>/);
});

test("inline style object properties are revealed one by one", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  const labels = plan.steps.map((s) => s.label);
  const idx = labels.indexOf("padding: 8");
  assert.ok(idx > 0);
  assert.equal(labels[idx + 1], "gap: 4");
  const [before] = stateAt(plan, [f.source], idx);
  assert.match(before, /<View style={{ }}>/);
  const [after] = stateAt(plan, [f.source], idx + 1);
  assert.match(after, /<View style={{ padding: 8, }}>/);
});

test("coarse mode has no property units", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document", coarse: true });
  assert.equal(plan.steps.some((s) => kind(s.units[0]) === "prop"), false);
  assert.ok(plan.steps.some((s) => kind(s.units[0]) === "style"));
});

test("arrays can be kept intact with arrays: false", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document", arrays: false });
  assert.equal(plan.steps.some((s) => kind(s.units[0]) === "item"), false);
});

test("unit ids are kind:line:col", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document" });
  for (const s of plan.steps) {
    for (const id of s.units) assert.match(id, /^(jsx|expr|text|style|prop|item):\d+:\d+$/);
  }
});

test("a multi-file plan hides every file at state 0 and steps through each", () => {
  const a = file(FIXTURE);
  const b = file(BADGE);
  const plan = buildPlan([a, b], { order: "document" });
  assert.deepEqual(plan.files, [FIXTURE, BADGE]);
  const state0 = stateAt(plan, [a.source, b.source], 0);
  assert.match(state0[0], /<View style={styles\.root}>\n    <\/View>/);
  assert.match(state0[1], /export const Badge = \(\) => \(\n  <View style={styles\.badge}>\n  <\/View>\n\);/);
  assert.match(state0[1], /badge: {\n    padding: 4,\n  },/);
  assert.ok(plan.steps.some((s) => s.file === 0));
  assert.ok(plan.steps.some((s) => s.file === 1));
  const final = stateAt(plan, [a.source, b.source], plan.steps.length);
  assert.equal(final[0], a.source);
  assert.equal(final[1], b.source);
});

test("estimateDuration adds a per-line cost on top of the interval", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document", interval: 400, perLine: 100 });
  const states = allStates(plan, [f.source]);
  let expected = 0;
  for (let k = 1; k < states.length; k++) {
    const added = states[k][0].split("\n").length - states[k - 1][0].split("\n").length;
    expected += 400 + 100 * Math.max(0, added);
  }
  assert.equal(estimateDuration(plan, [f.source]), expected);
});

test("a step delay override replaces the computed delay", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "document", interval: 400, perLine: 0 });
  const base = estimateDuration(plan, [f.source]);
  plan.steps[0].delay = 5000;
  assert.equal(estimateDuration(plan, [f.source]), base - 400 + 5000);
});

test("goto uses the editor URL scheme through open on macOS and the code CLI elsewhere", () => {
  const { gotoCommand } = require("./reveal");
  assert.deepEqual(gotoCommand("/Users/me/My App/Screen.tsx", 42, "vscode", "darwin"), {
    cmd: "open",
    args: ["-g", "vscode://file/Users/me/My%20App/Screen.tsx:42"],
  });
  assert.deepEqual(gotoCommand("/Users/me/Screen.tsx", 7, "cursor", "darwin"), {
    cmd: "open",
    args: ["-g", "cursor://file/Users/me/Screen.tsx:7"],
  });
  assert.deepEqual(gotoCommand("/home/me/Screen.tsx", 42, "vscode", "linux"), {
    cmd: "code",
    args: ["-g", "/home/me/Screen.tsx:42"],
  });
});

test("styled order reveals an element together with its style key and properties in one step", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "styled" });
  const step = plan.steps.find((s) => s.label === "<Text style={styles.title}>");
  assert.ok(step);
  const kinds = step.units.map(kind).sort();
  assert.deepEqual(kinds, ["jsx", "prop", "prop", "style"]);
  assert.equal(plan.steps.some((s) => s.label === "styles.title" || s.label === "title.color"), false);
  const idx = plan.steps.indexOf(step);
  const [text] = stateAt(plan, [f.source], idx + 1);
  assert.match(text, /<Text style={styles\.title}>Hello<\/Text>/);
  assert.match(text, /title: { color: "#fff", fontSize: 20 },/);
});

test("styled order merges inline style properties into the element step", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "styled" });
  const step = plan.steps.find((s) => s.label.startsWith("<View style={{ padding: 8"));
  assert.ok(step);
  assert.equal(step.units.filter((id) => kind(id) === "prop").length, 2);
  const [text] = stateAt(plan, [f.source], plan.steps.indexOf(step) + 1);
  assert.match(text, /<View style={{ padding: 8, gap: 4 }}>/);
});

test("styled order keeps array items as separate steps after the map that uses them", () => {
  const f = file(FIXTURE);
  const plan = buildPlan([f], { order: "styled" });
  const labels = plan.steps.map((s) => s.label);
  const mapIndex = labels.findIndex((l) => l.startsWith("{ITEMS.map("));
  assert.ok(mapIndex >= 0);
  assert.ok(plan.steps[mapIndex].units.some((id) => kind(id) === "style"), "row style should come with the map step");
  assert.deepEqual(labels.slice(mapIndex + 1, mapIndex + 4), ["ITEMS[0]", "ITEMS[1]", "ITEMS[2]"]);
});

test("styled order gives a shared style key to the first element that uses it", () => {
  const source = [
    'import React from "react";',
    'import { StyleSheet, Text, View } from "react-native";',
    "",
    "export default function Tiles() {",
    "  return (",
    "    <View style={styles.root}>",
    "      <View style={styles.tile} />",
    "      <View style={styles.tile} />",
    "    </View>",
    "  );",
    "}",
    "",
    "const styles = StyleSheet.create({",
    "  root: { flex: 1 },",
    "  tile: { height: 40 },",
    "});",
    "",
  ].join("\n");
  const plan = buildPlan([{ path: "Tiles.tsx", source }], { order: "styled" });
  assert.equal(plan.steps.length, 2);
  assert.equal(plan.steps[0].units.filter((id) => kind(id) === "style").length, 1);
  assert.equal(plan.steps[1].units.length, 1);
  const [text] = stateAt(plan, [source], 1);
  assert.match(text, /<View style={styles\.tile} \/>\n    <\/View>/);
  assert.match(text, /tile: { height: 40 },/);
});

