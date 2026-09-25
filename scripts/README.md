# reveal

Replays a finished screen onto disk in small chunks so Fast Refresh shows the
app building up on the simulator. Every intermediate state is valid code, so
there is no red screen between steps, and the file ends byte-identical to the
original.

## Recording workflow

1. Start the app (`npm start`) and open the screen you want to record.
2. Make sure the screen file is saved and closed or not dirty in VS Code, so the
   editor reloads it from disk on every step.
3. Run the tool. It writes the empty skeleton and waits:

   ```sh
   npm run reveal -- play src/navigation/screens/AppleFitness/AppleFitness.tsx
   ```

4. Start your screen recording, then press Enter. The file grows step by step
   and the simulator follows. When it finishes, the file is back to the original.
5. `q` or Ctrl+C at any point restores the original file immediately. If the
   process is killed some other way, `npm run reveal -- restore` puts the last
   backup back.

## Useful variations

```sh
# See how many steps and how long it will take, and write an editable plan
npm run reveal -- plan src/navigation/screens/Duolingo/Duolingo.tsx --out duolingo.json

# Play an edited plan (reorder, merge or drop steps, add "delay" or "pause": true)
npm run reveal -- play duolingo.json

# Slower pace, or advance manually with Enter for dramatic beats
npm run reveal -- play Duolingo.tsx --interval 700 --per-line 150
npm run reveal -- play Duolingo.tsx --manual

# Other orders: element together with its styles in one step (cursor stays in
# the JSX), or all JSX unstyled first and then the styles
npm run reveal -- play Duolingo.tsx --order styled
npm run reveal -- play Duolingo.tsx --order document

# Whole style objects per step instead of property by property
npm run reveal -- play Duolingo.tsx --coarse

# Several files in one recording, in the order given
npm run reveal -- play screens/Feed/Feed.tsx screens/Feed/PostCard.tsx

# Print the file as it will look at step 20, or verify a plan without writing
npm run reveal -- preview Duolingo.tsx --step 20
npm run reveal -- check duolingo.json
```

## What counts as a step

- Each JSX element, expression block and text node, top to bottom. In the
  default `inline` order an element appears with all its attributes, then the
  cursor jumps to the StyleSheet for its key and each property one by one, then
  comes back for the element's children, the way a person would type it. A key
  shared by several elements is written with the first one.
- `styled` order merges the element and its styles into one step so the cursor
  never leaves the JSX and every step is visible at once.
- Items of module-level data arrays, revealed right after the first `.map` that
  uses them. Arrays that are indexed directly (`DATA[0]`) stay intact.
- In `document` order, StyleSheet keys and their properties are separate steps
  after all the JSX. Inline `style={{ }}` objects are revealed property by
  property in every order except `styled`.
- The component root and the styles it references are part of the skeleton,
  so the empty screen already has the right background from the first frame.
  Pass `--reveal-root` to reveal them as steps instead, starting from a `null`
  root.

## Editing a plan

`plan` writes JSON with one step per unit. Each step has `file`, `units` and a
`label`. You can reorder steps, put several unit ids in one step to reveal them
together, add `"delay": 2000` to hold after a step, or `"pause": true` to wait
for Enter. Any unit missing from the plan is appended as a final step so the
file always ends complete.

## Editor tips

- `--goto` (on by default) scrolls the editor to each new chunk. On macOS it
  opens a `vscode://file/...:line` URL in the already running window through
  `open -g`, so no extra process shows up in the Dock and focus stays where it
  is. Use `--goto-scheme cursor` (or `vscode-insiders`, `windsurf`) for other
  editors, or `--no-goto` to disable.
- The first time, VS Code asks whether an external application may open the
  file. Tick "Allow opening local paths without asking" and press Yes once.
  That is the `security.promptForLocalFileProtocolHandling` user setting; it
  cannot be set per workspace. The setting is read when VS Code starts, so
  restart it after ticking the box.
- Metro needs a moment per save. If the simulator lags behind the editor, raise
  `--interval`.
- TypeScript will underline `styles.header` while the `header` key is still
  hidden. If that shows in recordings, add
  `"typescript.validate.enable": false` to `.vscode/settings.json` for this
  project, or use `--order inline` so each key appears right after its use.

## Tests

```sh
npm run test:reveal
```
