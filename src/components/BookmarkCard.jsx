import { CheckCircle, ExternalLink, Eye, Loader2, XCircle } from "lucide-react";

const BookmarkCard = ({ bookmark, onRemove, onViewUnpacked }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow w-full min-w-0">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 pr-2 min-w-0 break-words">
          {bookmark.title}
        </h3>
        <button
          onClick={() => onRemove(bookmark.id)}
          className="text-gray-400 hover:text-red-500 flex-shrink-0 ml-1"
        >
          <XCircle size={14} />
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-2 break-all leading-relaxed min-w-0 overflow-wrap-anywhere">
        {bookmark.url}
      </p>

      <div className="mb-3">
        <span className="text-xs text-gray-400">
          {new Date(bookmark.timestamp).toLocaleDateString()}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="w-full min-w-0">
        <div className="flex flex-col gap-2 w-full">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-w-0 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 hover:text-blue-800 text-xs py-2 px-2 rounded-md flex items-center justify-center gap-1 transition-colors"
          >
            <ExternalLink size={12} className="flex-shrink-0" />
            <span className="truncate">View Original</span>
          </a>

          {bookmark.unpackedUrl && (
            <a
              href={bookmark.unpackedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-w-0 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 hover:text-green-800 text-xs py-2 px-2 rounded-md flex items-center justify-center gap-1 transition-colors"
            >
              <Eye size={12} className="flex-shrink-0" />
              <span className="truncate">View Unpacked</span>
            </a>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      {(bookmark.unpackStatus === "processing" ||
        bookmark.unpackStatus === "success" ||
        bookmark.unpackStatus === "failed") && (
        <div className="mt-3 pt-2 border-t border-gray-100">
          {bookmark.unpackStatus === "processing" && (
            <div className="flex items-center gap-2 text-orange-600 text-xs">
              <Loader2 size={12} className="animate-spin flex-shrink-0" />
              <span className="truncate">Processing...</span>
            </div>
          )}

          {bookmark.unpackStatus === "success" && (
            <div className="flex items-center gap-2 text-green-600 text-xs">
              <CheckCircle size={12} className="flex-shrink-0" />
              <span className="truncate">Unpacked successfully</span>
            </div>
          )}

          {bookmark.unpackStatus === "failed" && (
            <div className="flex items-center gap-2 text-red-600 text-xs">
              <XCircle size={12} className="flex-shrink-0" />
              <span className="truncate">Failed to unpack</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
