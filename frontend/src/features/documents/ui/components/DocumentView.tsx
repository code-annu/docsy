import type { DocumentSummary } from "../../data/types";

interface DocumentViewProps {
  document: DocumentSummary;
  onClick: (id: string) => void;
}

const DocumentView: React.FC<DocumentViewProps> = ({ document, onClick }) => {
  return (
    <div
      onClick={() => onClick(document.id)}
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
        {document.title}
      </h3>
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
        <div className="flex items-center space-x-1">
          {document.owner.avatarUrl ? (
            <img
              src={document.owner.avatarUrl}
              alt={document.owner.fullname}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
              {document.owner.fullname.charAt(0)}
            </div>
          )}
          <span>{document.owner.fullname}</span>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        <div>
          Last Viewed:{" "}
          {document.lastViewedAt
            ? new Date(document.lastViewedAt).toLocaleDateString()
            : "Never"}
        </div>
        <div>
          {document.isPrivate ? "Private" : "Public"} • Version:{" "}
          {document.currentVersion}
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
