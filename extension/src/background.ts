/**
 * Background service worker foundation.
 *
 * Future work:
 * - Open the popup after a context-menu action
 * - Auto-fill and optionally auto-run verification for selected text
 * - Coordinate with content scripts (without injecting into Facebook yet)
 */

export {}

const CONTEXT_MENU_ID = "trustlens-verify-selection"
const PENDING_SELECTED_TEXT_KEY = "pendingSelectedText"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU_ID,
      title: "Check selected text with TrustLens",
      contexts: ["selection"]
    })
  })
})

chrome.contextMenus.onClicked.addListener((info, _tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID || !info.selectionText?.trim()) {
    return
  }

  // Ephemeral handoff only — cleared when the popup opens. Not sent to the backend.
  chrome.storage.session.set({
    [PENDING_SELECTED_TEXT_KEY]: info.selectionText.trim()
  })

  // Future: open popup automatically or trigger a background verification flow.
})

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "GET_PENDING_SELECTED_TEXT") {
    chrome.storage.session.get(PENDING_SELECTED_TEXT_KEY, (stored) => {
      sendResponse({
        text: stored[PENDING_SELECTED_TEXT_KEY] ?? null
      })
    })
    return true
  }

  if (message?.type === "CLEAR_PENDING_SELECTED_TEXT") {
    chrome.storage.session.remove(PENDING_SELECTED_TEXT_KEY, () => {
      sendResponse({ ok: true })
    })
    return true
  }

  return false
})
