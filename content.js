// Preserve Ctrl+D as forward delete in the ChatGPT prompt editor.
// ChatGPT may use Ctrl+D for voice input, so this content script intercepts
// only plain Ctrl+D while the prompt editor is focused.
// Keep prompt editor detection isolated because ChatGPT's DOM can change.

const isPromptEditor = (el) => el instanceof HTMLElement && el.id === "prompt-textarea"

const isPlainCtrlD = (event) =>
  event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "d"

const forwardDelete = (el) => {
  const selection = window.getSelection()
  if (!selection?.rangeCount) return
  if (!selection.anchorNode || !el.contains(selection.anchorNode)) return

  // execCommand() is deprecated, but Chrome still routes editing commands through
  // the editor/undo pipeline more reliably than direct Selection DOM deletion.
  const command = selection.isCollapsed ? "forwardDelete" : "delete"
  document.execCommand(command)
}

const onKeydown = (event) => {
  if (event.isComposing || event.defaultPrevented) return
  if (!isPlainCtrlD(event)) return

  const active = document.activeElement
  if (!isPromptEditor(active)) return

  event.preventDefault()
  event.stopImmediatePropagation()

  forwardDelete(active)
}

// use capture so we can intercept Ctrl+D before ChatGPT handles it.
document.addEventListener("keydown", onKeydown, { capture: true })
