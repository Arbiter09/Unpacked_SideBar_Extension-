// background.js

// 1) On install or update, tell Chrome to open the side panel
//    whenever the toolbar icon is clicked.
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .then(() => console.log("🔍 sidePanel: will open on action click"))
    .catch((err) =>
      console.error("❌ sidePanel: failed to set panel behavior:", err)
    );
});

// 2) Fallback for older Chrome versions: manually open on click.
//    (If setPanelBehavior succeeds, this will effectively be a no-op
//     because Chrome will already have opened the panel.)
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel
    .open({ tabId: tab.id })
    .then(() => console.log("🔍 sidePanel: opened manually"))
    .catch((err) =>
      console.error("❌ sidePanel: failed to open manually:", err)
    );
});
