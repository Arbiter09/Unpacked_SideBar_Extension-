import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Loader2,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import mockUnpackApi from "../utils/mockUnpackApi"; // Mock API for unpacking URLs
import {
  getCurrentTab,
  saveToStorage,
  loadFromStorage,
} from "../utils/chromeApiHelpers";
import Sidebar from "./Sidebar"; // Sidebar component for navigation
import BookmarkCard from "./BookmarkCard"; // Component to display individual bookmarks
import UnpackedViewer from "./UnpackedViewer"; // Component to view unpacked content

const SidePanelExtension = () => {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [viewingUnpacked, setViewingUnpacked] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarks from Chrome storage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get current tab info
        const currentTab = await getCurrentTab();
        if (currentTab) {
          setCurrentUrl(currentTab.url || "");
          setCurrentTitle(currentTab.title || "");
        }

        // Load saved bookmarks
        const savedBookmarks = await loadFromStorage("bookmarks");
        if (savedBookmarks && Array.isArray(savedBookmarks)) {
          setBookmarks(savedBookmarks);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save bookmarks to Chrome storage whenever bookmarks change
  useEffect(() => {
    const saveBookmarks = async () => {
      if (!isLoading && bookmarks.length > 0) {
        try {
          await saveToStorage("bookmarks", bookmarks);
        } catch (error) {
          console.error("Error saving bookmarks:", error);
        }
      }
    };

    saveBookmarks();
  }, [bookmarks, isLoading]);

  // Check if current URL is already bookmarked
  useEffect(() => {
    setIsBookmarked(bookmarks.some((bookmark) => bookmark.url === currentUrl));
  }, [bookmarks, currentUrl]);

  const handleBookmark = async () => {
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

  const handleRemoveBookmark = async (bookmarkId) => {
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

  const handleViewUnpacked = (bookmark) => {
    setViewingUnpacked(bookmark);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 size={24} className="animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 min-w-0 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {activeTab === "bookmarks" && (
          <div className="flex-1 p-2 sm:p-4 overflow-y-auto min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Bookmarks
            </h2>

            {/* Current Page Section */}
            {currentUrl && (
              <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6 min-w-0">
                <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  Current Page
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words leading-relaxed">
                  {currentTitle || "Untitled"}
                </p>
                <p className="text-xs text-gray-500 mb-3 break-all leading-relaxed">
                  {currentUrl}
                </p>

                <button
                  onClick={handleBookmark}
                  disabled={isBookmarked || isBookmarking}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto justify-center sm:justify-start ${
                    isBookmarked
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : isBookmarking
                      ? "bg-orange-100 text-orange-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isBookmarking ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin flex-shrink-0"
                      />
                      <span className="truncate">Bookmarking...</span>
                    </>
                  ) : isBookmarked ? (
                    <>
                      <BookmarkCheck size={14} className="flex-shrink-0" />
                      <span className="truncate">Bookmarked</span>
                    </>
                  ) : (
                    <>
                      <Bookmark size={14} className="flex-shrink-0" />
                      <span className="truncate">Bookmark</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Saved Bookmarks */}
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
                Saved Bookmarks ({bookmarks.length})
              </h3>

              {bookmarks.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <Bookmark
                    size={24}
                    className="sm:w-8 sm:h-8 mx-auto mb-2 opacity-50"
                  />
                  <p className="text-xs sm:text-sm">No bookmarks yet</p>
                </div>
              ) : (
                <div className="space-y-3 min-w-0">
                  {bookmarks.map((bookmark) => (
                    <BookmarkCard
                      key={bookmark.id}
                      bookmark={bookmark}
                      onRemove={handleRemoveBookmark}
                      onViewUnpacked={handleViewUnpacked}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "tab2" && (
          <div className="flex-1 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
            <div className="text-center text-gray-500">
              <ExternalLink
                size={24}
                className="sm:w-8 sm:h-8 mx-auto mb-2 opacity-50"
              />
              <p className="text-xs sm:text-sm">Tab 2 content goes here</p>
            </div>
          </div>
        )}

        {activeTab === "tab3" && (
          <div className="flex-1 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
            <div className="text-center text-gray-500">
              <ExternalLink
                size={24}
                className="sm:w-8 sm:h-8 mx-auto mb-2 opacity-50"
              />
              <p className="text-xs sm:text-sm">Tab 3 content goes here</p>
            </div>
          </div>
        )}
      </div>

      {/* Unpacked Viewer Modal */}
      {viewingUnpacked && (
        <UnpackedViewer
          bookmark={viewingUnpacked}
          onClose={() => setViewingUnpacked(null)}
        />
      )}
    </div>
  );
};

export default SidePanelExtension;
