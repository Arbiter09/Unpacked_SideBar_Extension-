import React, { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import Sidebar from "./Sidebar";
import Bookmarks from "./BookMarks";
import SavedBookMarks from "./SavedBookMarks";
import { mockData } from "../utils/mockData";

const SidePanelExtension = () => {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Simulate getting current tab info (replace with Chrome extension API)
  useEffect(() => {
    // In your actual Chrome extension, replace this with:
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   setCurrentUrl(tabs[0].url);
    //   setCurrentTitle(tabs[0].title);
    // });

    // Demo data for this example
    setCurrentUrl("https://example.com/some-page");
    setCurrentTitle("Example Page Title");

    // Load bookmarks from localStorage
    // In your actual extension, replace this with:
    // const savedBookmarks = JSON.parse(localStorage.getItem('extensionBookmarks') || '[]');
    // setBookmarks(savedBookmarks);

    // Demo bookmarks
    setBookmarks(mockData);
  }, []);

  // Check if current URL is already bookmarked
  useEffect(() => {
    setIsBookmarked(bookmarks.some((bookmark) => bookmark.url === currentUrl));
  }, [bookmarks, currentUrl]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === "bookmarks" && (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bookmarks
            </h2>

            {/* Current Page Section */}
            <Bookmarks
              isBookmarked={isBookmarked}
              bookmarks={bookmarks}
              setBookmarks={setBookmarks}
              currentTitle={currentTitle}
              currentUrl={currentUrl}
            />

            {/* Saved Bookmarks */}
            <SavedBookMarks bookmarks={bookmarks} setBookmarks={setBookmarks} />
          </div>
        )}

        {activeTab === "tab2" && (
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ExternalLink size={32} className="mx-auto mb-2 opacity-50" />
              <p>Tab 2 content goes here</p>
            </div>
          </div>
        )}

        {activeTab === "tab3" && (
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
