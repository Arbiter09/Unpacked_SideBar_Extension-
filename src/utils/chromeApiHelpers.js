// Chrome API helpers
export const getCurrentTab = async () => {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0] || null);
      });
    } else {
      // Fallback for development/testing
      resolve({
        url: "https://indianexpress.com/article/lifestyle/food-wine/mumbai-masque-indian-the-worlds-50-best-restaurants-list-68th-position-10084933/lite/",
        title: "Mumbai's Masque among World's 50 Best Restaurants",
      });
    }
  });
};

export const saveToStorage = async (key, data) => {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ [key]: data }, resolve);
    } else {
      // Fallback for development - use localStorage
      localStorage.setItem(key, JSON.stringify(data));
      resolve();
    }
  });
};

export const loadFromStorage = async (key) => {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] || null);
      });
    } else {
      // Fallback for development - use localStorage
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
    }
  });
};
