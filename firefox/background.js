// background.js
// Firefox-exclusive sidebar extension

// Handle browser action clicks to toggle sidebar
browser.browserAction.onClicked.addListener(async () => {
  try {
    // Use the built-in toggle method - much simpler!
    await browser.sidebarAction.toggle();
    console.log("🦊 Sidebar toggled");
  } catch (err) {
    console.error("❌ Failed to toggle sidebar:", err);
  }
});

console.log("🦊 Firefox sidebar extension loaded");
