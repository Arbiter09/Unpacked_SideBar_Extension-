import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, Trash2, ExternalLink } from 'lucide-react';

const SidePanelExtension = () => {
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Simulate getting current tab info (replace with Chrome extension API)
  useEffect(() => {
    // In your actual Chrome extension, replace this with:
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentUrl(tabs[0].url);
      setCurrentTitle(tabs[0].title);
    });
    
    // Demo data for this example
    setCurrentUrl('https://example.com/some-page');
    setCurrentTitle('Example Page Title');
    
    // Load bookmarks from localStorage
    // In your actual extension, replace this with:
    const savedBookmarks = JSON.parse(localStorage.getItem('extensionBookmarks') || '[]');
    setBookmarks(savedBookmarks);
    
    // Demo bookmarks
    // setBookmarks([
    //   { id: 1, url: 'https://github.com', title: 'GitHub', savedAt: new Date().toISOString() },
    //   { id: 2, url: 'https://stackoverflow.com', title: 'Stack Overflow', savedAt: new Date().toISOString() }
    // ]);
  }, []);

  // Check if current URL is already bookmarked
  useEffect(() => {
    setIsBookmarked(bookmarks.some(bookmark => bookmark.url === currentUrl));
  }, [bookmarks, currentUrl]);

  const saveBookmark = () => {
    if (!currentUrl || isBookmarked) return;

    const newBookmark = {
      id: Date.now(),
      url: currentUrl,
      title: currentTitle,
      savedAt: new Date().toISOString()
    };

    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);

    // In your actual Chrome extension, add this line:
     localStorage.setItem('extensionBookmarks', JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (bookmarkId) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
    setBookmarks(updatedBookmarks);

    // In your actual Chrome extension, add this line:
     localStorage.setItem('extensionBookmarks', JSON.stringify(updatedBookmarks));
  };

  const openBookmark = (url) => {
    // In your actual Chrome extension, replace this with:
    chrome.tabs.create({ url: url });
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'tab2', label: 'Tab 2', icon: ExternalLink },
    { id: 'tab3', label: 'Tab 3', icon: ExternalLink }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 flex items-center justify-center hover:bg-gray-100 transition-colors ${
                activeTab === tab.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
              title={tab.label}
            >
              <Icon 
                size={20} 
                className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'} 
              />
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'bookmarks' && (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bookmarks</h2>
            
            {/* Current Page Section */}
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
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
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

            {/* Saved Bookmarks */}
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
                            <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
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
          </div>
        )}

        {activeTab === 'tab2' && (
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ExternalLink size={32} className="mx-auto mb-2 opacity-50" />
              <p>Tab 2 content goes here</p>
            </div>
          </div>
        )}

        {activeTab === 'tab3' && (
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ExternalLink size={32} className="mx-auto mb-2 opacity-50" />
              <p>Tab 3 content goes here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidePanelExtension;