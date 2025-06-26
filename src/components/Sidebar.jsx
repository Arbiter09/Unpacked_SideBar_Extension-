import React from 'react'

const Sidebar = () => {
  return (
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
  )
}

export default Sidebar