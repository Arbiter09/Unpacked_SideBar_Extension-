const UnpackedViewer = ({ bookmark, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 truncate">
            {bookmark.title} - Unpacked View
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle size={20} />
          </button>
        </div>

        <div className="flex-1 p-4">
          <iframe
            src={bookmark.unpackedUrl}
            className="w-full h-full border border-gray-200 rounded"
            title="Unpacked content"
          />
        </div>
      </div>
    </div>
  );
};

export default UnpackedViewer;
