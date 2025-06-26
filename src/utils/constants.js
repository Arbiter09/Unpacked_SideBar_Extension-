import { Bookmark, BookmarkCheck, Trash2, ExternalLink } from "lucide-react";

export const tabs = [
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "tab2", label: "Tab 2", icon: ExternalLink },
  { id: "tab3", label: "Tab 3", icon: ExternalLink },
];

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
