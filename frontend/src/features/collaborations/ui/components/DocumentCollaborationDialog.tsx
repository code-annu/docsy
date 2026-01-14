import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import {
  createCollaboration,
  deleteCollaboration,
  getCollaborations,
  updateCollaboration,
} from "../../state/collaboration-thunk";
import { CollaborationRole } from "../../data/types";
import { CollaboratorComp } from "./CollaboratorComp";
import { PrimaryButton } from "../../../../common/components/buttons/PrimaryButton";
import { TextInputField } from "../../../../common/components/inputs/TextInputField";

interface DocumentCollaborationDialogProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
}

export const DocumentCollaborationDialog: React.FC<
  DocumentCollaborationDialogProps
> = ({ documentId, isOpen, onClose, currentUserId }) => {
  const dispatch = useAppDispatch();
  const {
    documentCollaborations,
    isLoading,
    create,
    update,
    delete: deleteState,
    error,
  } = useAppSelector((state) => state.collaboration);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<CollaborationRole>(CollaborationRole.VIEWER);

  useEffect(() => {
    if (isOpen && documentId) {
      dispatch(getCollaborations(documentId));
    }
  }, [dispatch, isOpen, documentId]);

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    await dispatch(
      createCollaboration({
        documentId,
        data: { collaboratorEmail: email, role },
      })
    ).unwrap();
    setEmail("");
    setRole(CollaborationRole.VIEWER);
  };

  const handleUpdateRole = (id: string, newRole: CollaborationRole) => {
    dispatch(updateCollaboration({ id, role: newRole }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to remove this collaborator?")) {
      dispatch(deleteCollaboration(id));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Document Collaborators
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error.error.message}
            </div>
          )}

          {/* Add Collaborator Form */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Add Collaborator
            </h3>
            <form
              onSubmit={handleAddCollaborator}
              className="flex flex-col sm:flex-row gap-3 items-end"
            >
              <div className="flex-1 w-full">
                <TextInputField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  required
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as CollaborationRole)}
                  className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value={CollaborationRole.VIEWER}>Viewer</option>
                  <option value={CollaborationRole.EDITOR}>Editor</option>
                  <option value={CollaborationRole.OWNER}>Owner</option>
                </select>
              </div>
              <PrimaryButton
                type="submit"
                isLoading={create.creating}
                disabled={!email}
                className="w-full sm:w-auto"
              >
                Invite
              </PrimaryButton>
            </form>
            {create.error && (
              <p className="mt-2 text-sm text-red-600">
                {create.error.error.message}
              </p>
            )}
          </div>

          {/* Collaborators List */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Current Collaborators ({documentCollaborations.length})
            </h3>
            {isLoading && documentCollaborations.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
              </div>
            ) : documentCollaborations.length > 0 ? (
              <div className="space-y-3">
                {documentCollaborations.map((collab) => (
                  <CollaboratorComp
                    key={collab.id}
                    collaboration={collab}
                    currentUserId={currentUserId}
                    onUpdateRole={handleUpdateRole}
                    onDelete={handleDelete}
                    isUpdating={update.updating}
                    isDeleting={deleteState.deleting}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No collaborators yet. Invite someone above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
