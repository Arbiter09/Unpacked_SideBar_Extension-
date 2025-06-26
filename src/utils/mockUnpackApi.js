// Mock API function

// Mock URL mapping for testing
export const mockUrlMapping = {
  "https://indianexpress.com/article/lifestyle/food-wine/mumbai-masque-indian-the-worlds-50-best-restaurants-list-68th-position-10084933/lite/":
    {
      metadataId: "0c7fb34a-0ab7-4823-b84b-22b5ae875814",
      unpackedUrl:
        "https://unpacked.so/link/0c7fb34a-0ab7-4823-b84b-22b5ae875814",
    },
  "https://www.engadget.com/mobile/apple-released-ios-26-beta-2-heres-everything-you-need-to-know-about-the-iphone-operating-system-135749886.html":
    {
      metadataId: "4353464b-bddb-4c93-859e-e3c303132f55",
      unpackedUrl:
        "https://unpacked.so/link/4353464b-bddb-4c93-859e-e3c303132f55",
    },
  "https://www.bbc.com/news/articles/c75r7r07ndno": {
    metadataId: "19cfa5d7-fd65-4e8b-9729-1def83de6c3d",
    unpackedUrl:
      "https://unpacked.so/link/19cfa5d7-fd65-4e8b-9729-1def83de6c3d",
  },
};

const mockUnpackApi = async (url) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if URL has a mapping
  if (mockUrlMapping[url]) {
    return {
      status: "success",
      metadataId: mockUrlMapping[url].metadataId,
      unpackedUrl: mockUrlMapping[url].unpackedUrl,
    };
  } else {
    return {
      status: "failed",
      error: "Failed to process the URL",
    };
  }
};

export default mockUnpackApi;
