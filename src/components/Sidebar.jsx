import { Bookmark, ExternalLink } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { id: "tab2", label: "Tab 2", icon: ExternalLink },
    { id: "tab3", label: "Tab 3", icon: ExternalLink },
  ];

  return (
    <div className="w-12 sm:w-16 bg-white border-r border-gray-200 flex flex-col items-center py-2 sm:py-4 flex-shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2 sm:p-3 rounded-lg mb-1 sm:mb-2 transition-colors ${
              activeTab === tab.id
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title={tab.label}
          >
            <Icon size={16} className="sm:w-5 sm:h-5" />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
