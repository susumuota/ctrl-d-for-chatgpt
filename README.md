# Ctrl+D Forward Delete for ChatGPT

A small Chrome extension that keeps `Ctrl+D` as forward delete in the ChatGPT prompt editor.

ChatGPT may use `Ctrl+D` as a voice input shortcut. This extension keeps `Ctrl+D` available for Emacs-style text editing while the prompt editor is focused.

## What It Does

When the ChatGPT prompt editor is focused, pressing `Ctrl+D` deletes the selected text. If there is no selection, it deletes the character after the caret. Outside the prompt editor, the extension does not change ChatGPT shortcuts.

The extension only runs on:

```text
https://chatgpt.com/*
```

## Installation

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click "Load unpacked".
4. Select this repository directory.
5. Open or reload `https://chatgpt.com/`.

## Usage

1. Open `https://chatgpt.com/`.
2. Click the prompt editor.
3. Press `Ctrl+D` while editing text.

While the prompt editor is focused, `Ctrl+D` behaves like forward delete instead of triggering ChatGPT's voice input shortcut:

- with selected text, it deletes the selection
- without selected text, it deletes the character after the caret

The extension only intercepts plain `Ctrl+D` in the prompt editor. Other ChatGPT shortcuts and uses of `Ctrl+D` outside the prompt editor are left unchanged.

## Development

This extension is intentionally dependency-free. The content script is plain JavaScript and is loaded directly by Chrome.

Target Chrome version: Chrome 147.0.7727.116 or later.

Run basic validation with:

```sh
node --check content.js
node -e "JSON.parse(require('node:fs').readFileSync('manifest.json', 'utf8'))"
```

## License

MIT
