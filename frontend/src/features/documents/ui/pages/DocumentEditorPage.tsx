import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDocument,
  updateDocument,
  deleteDocument,
} from "../../state/document-thunk";
import { clearCurrentDocument } from "../../state/document-slice";
import { getCollaborations } from "../../../collaborations/state/collaboration-thunk";
import { DocumentCollaborationDialog } from "../../../collaborations/ui/components/DocumentCollaborationDialog";
import { CollaborationRole } from "../../../collaborations/data/types";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import { PrimaryButton } from "../../../../common/components/buttons/PrimaryButton";
import { DangerButton } from "../../../../common/components/buttons/DangerButton";

export const DocumentEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    currentDocument,
    isLoading,
    fetchingError,
    update,
    delete: deleteState,
  } = useAppSelector((state) => state.document);

  const { documentCollaborations } = useAppSelector(
    (state) => state.collaboration
  );
  const { profile } = useAppSelector((state) => state.profile);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCollaborationDialogOpen, setIsCollaborationDialogOpen] =
    useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getDocument(id));
      dispatch(getCollaborations(id));
    }
    return () => {
      dispatch(clearCurrentDocument());
    };
  }, [dispatch, id]);

  const getCurrentUserRole = (): CollaborationRole | null => {
    if (!currentDocument || !profile) return null;
    if (currentDocument.owner.id === profile.id) return CollaborationRole.OWNER;
    const collaboration = documentCollaborations.find(
      (c) => c.collaborator.id === profile.id
    );
    return collaboration ? collaboration.role : null;
  };

  const currentUserRole = getCurrentUserRole();
  const canManageCollaborations =
    currentUserRole === CollaborationRole.OWNER ||
    currentUserRole === CollaborationRole.EDITOR;

  useEffect(() => {
    if (currentDocument) {
      setTitle(currentDocument.title);
      setContent(currentDocument.currentContent);
    }
  }, [currentDocument]);

  const handleSave = async () => {
    if (!id) return;
    await dispatch(
      updateDocument({
        id,
        title,
        currentContent: content,
      })
    );
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to delete this document?")) {
      await dispatch(deleteDocument(id)).unwrap();
      navigate("/documents");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (fetchingError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-red-600">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-xl font-semibold mb-2">Error Loading Document</p>
          <p className="text-gray-600 mb-6">{fetchingError.error.message}</p>
          <button
            onClick={() => navigate("/documents")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Back to Documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] font-sans text-gray-900">
      {/* Navbar / Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="flex items-center flex-1 gap-4 overflow-hidden">
          <button
            onClick={() => navigate("/documents")}
            className="p-2 text-gray-500 transition-colors rounded-xl hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200"
            title="Back to Documents"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex flex-col w-full max-w-2xl gap-0.5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg font-semibold tracking-tight text-gray-800 placeholder-gray-400 bg-transparent border-none rounded focus:ring-0 focus:outline-none focus:bg-gray-50 -ml-2 px-2 py-0.5 transition-colors"
              placeholder="Untitled Document"
              aria-label="Document Title"
            />
            {currentDocument && (
              <div className="flex items-center gap-2 px-0.5">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  Last edited{" "}
                  {new Date(currentDocument.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {update.updating && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-600 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Saving...
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {canManageCollaborations && (
            <button
              onClick={() => setIsCollaborationDialogOpen(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
            >
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Share
            </button>
          )}

          <div className="h-6 mx-1 border-l border-gray-200"></div>

          <DangerButton
            onClick={handleDelete}
            isLoading={deleteState.deleting}
            title="Delete Document"
            className="!p-2.5 !rounded-lg text-red-600 bg-red-50 hover:bg-red-100 border-none shadow-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </DangerButton>

          <PrimaryButton
            onClick={handleSave}
            isLoading={update.updating}
            className="!px-5 shadow-sm shadow-green-200"
          >
            Save
          </PrimaryButton>
        </div>
      </header>

      {/* Main Editor Area */}
      <main className="flex-1 w-full overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl px-4 py-8 mx-auto md:py-12 lg:px-8">
          <div className="min-h-[calc(100vh-160px)] bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-gray-100 relative transition-shadow hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)]">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full p-8 text-lg leading-relaxed text-gray-800 placeholder-gray-300 bg-transparent border-none outline-none resize-none md:p-12 md:text-xl focus:ring-0 font-serif"
              placeholder="Start writing..."
              spellCheck={false}
              style={{
                borderRadius: "inherit",
                minHeight: "80vh",
              }}
            />
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm font-medium">
            End of Document
          </div>
        </div>
      </main>

      {id && profile && (
        <DocumentCollaborationDialog
          documentId={id}
          isOpen={isCollaborationDialogOpen}
          onClose={() => setIsCollaborationDialogOpen(false)}
          currentUserId={profile.id}
        />
      )}
    </div>
  );
};
