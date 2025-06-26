export const handleBookmark = async () => {
  if (isBookmarked || !currentUrl) return;

  setIsBookmarking(true);

  // Create new bookmark with processing status
  const newBookmark = {
    id: Date.now(),
    title: currentTitle || currentUrl,
    url: currentUrl,
    timestamp: new Date().toISOString(),
    unpackStatus: "processing",
  };

  const updatedBookmarks = [newBookmark, ...bookmarks];
  setBookmarks(updatedBookmarks);

  try {
    // Call mock API
    const result = await mockUnpackApi(currentUrl);

    // Update bookmark with result
    const finalBookmarks = updatedBookmarks.map((bookmark) =>
      bookmark.id === newBookmark.id
        ? {
            ...bookmark,
            unpackStatus: result.status,
            metadataId: result.metadataId,
            unpackedUrl: result.unpackedUrl,
            error: result.error,
          }
        : bookmark
    );

    setBookmarks(finalBookmarks);
  } catch (error) {
    // Handle API error
    const errorBookmarks = updatedBookmarks.map((bookmark) =>
      bookmark.id === newBookmark.id
        ? { ...bookmark, unpackStatus: "failed", error: "API Error" }
        : bookmark
    );

    setBookmarks(errorBookmarks);
  } finally {
    setIsBookmarking(false);
  }
};

export const handleRemoveBookmark = async (bookmarkId) => {
  const updatedBookmarks = bookmarks.filter(
    (bookmark) => bookmark.id !== bookmarkId
  );
  setBookmarks(updatedBookmarks);

  // If no bookmarks left, clear storage
  if (updatedBookmarks.length === 0) {
    try {
      await saveToStorage("bookmarks", []);
    } catch (error) {
      console.error("Error clearing bookmarks:", error);
    }
  }
};
