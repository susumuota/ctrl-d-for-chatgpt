# Repository Guidelines

This repository contains Ctrl+D Forward Delete for ChatGPT, a small Chrome extension that makes `Ctrl+D` act as forward delete in the ChatGPT prompt editor. ChatGPT may otherwise treat `Ctrl+D` as a voice input shortcut, but this extension preserves the Emacs-style text-editing meaning of `Ctrl+D` while the prompt editor is focused.

## Project Structure

- `manifest.json`: Chrome extension manifest, currently Manifest V3.
- `content.js`: Content script injected into `https://chatgpt.com/*`.
- `README.md`: User-facing installation and usage notes.
- `LICENSE`: MIT license.

## Development Notes

- Keep the extension dependency-free unless there is a clear reason to add tooling.
- Prefer plain JavaScript that can run directly as a Chrome content script.
- Keep permissions and match patterns as narrow as possible.
- Do not change unrelated behavior on ChatGPT pages.
- Keep the behavior scoped to text editing: `Ctrl+D` should only override ChatGPT's voice input shortcut while the prompt editor is focused.
- Treat the ChatGPT DOM as unstable. Keep selectors easy to find and revise.

## Formatting

- Follow `.prettierrc.json`.
- JavaScript uses no semicolons.
- Keep comments short and only add them when they clarify behavior that is not obvious from the code.

## Verification

Run these checks before committing:

```sh
node --check content.js
node -e "JSON.parse(require('node:fs').readFileSync('manifest.json', 'utf8'))"
```

Manual smoke test:

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Load this repository with "Load unpacked".
4. Open `https://chatgpt.com/`.
5. Focus the prompt editor.
6. Confirm `Ctrl+D` deletes the selected text, or deletes the character after the caret when there is no selection.
