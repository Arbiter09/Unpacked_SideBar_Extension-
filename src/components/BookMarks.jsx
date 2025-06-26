import { Bookmark, BookmarkCheck } from "lucide-react";
import React from "react";

const BookMarks = ({
  isBookmarked,
  bookmarks,
  setBookmarks,
  currentTitle,
  currentUrl,
}) => {
  const saveBookmark = () => {
    if (!currentUrl || isBookmarked) return;

    const newBookmark = {
      id: Date.now(),
      url: currentUrl,
      title: currentTitle,
      savedAt: new Date().toISOString(),
    };

    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);

    // In your actual Chrome extension, add this line:
    // localStorage.setItem('extensionBookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">Current Page</h3>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{currentTitle}</p>
          <p className="text-sm text-gray-500 truncate">{currentUrl}</p>
        </div>
        <button
          onClick={saveBookmark}
          disabled={isBookmarked}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isBookmarked
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck size={16} />
              Saved
            </>
          ) : (
            <>
              <Bookmark size={16} />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookMarks;
