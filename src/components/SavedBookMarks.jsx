import React from "react";
import { formatDate } from "../utils/constants";
import { Bookmark, Trash2 } from "lucide-react";

const SavedBookMarks = ({ bookmarks, setBookmarks }) => {
  const openBookmark = (url) => {
    // In your actual Chrome extension, replace this with:
    // chrome.tabs.create({ url: url });
    window.open(url, "_blank");
  };

  const removeBookmark = (bookmarkId) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== bookmarkId
    );
    setBookmarks(updatedBookmarks);

    // In your actual Chrome extension, add this line:
    // localStorage.setItem('extensionBookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-3">
        Saved Bookmarks ({bookmarks.length})
      </h3>

      {bookmarks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Bookmark size={32} className="mx-auto mb-2 opacity-50" />
          <p>No bookmarks saved yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => openBookmark(bookmark.url)}
                    className="text-left w-full group"
                  >
                    <p className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {bookmark.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {bookmark.url}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Saved {formatDate(bookmark.savedAt)}
                    </p>
                  </button>
                </div>
                <button
                  onClick={() => removeBookmark(bookmark.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBookMarks;
