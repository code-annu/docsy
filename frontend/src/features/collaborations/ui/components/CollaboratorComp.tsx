import React from "react";
import type { Collaboration } from "../../data/types";
import { CollaborationRole } from "../../data/types";
import { DangerButton } from "../../../../common/components/buttons/DangerButton";

interface CollaboratorCompProps {
  collaboration: Collaboration;
  currentUserId: string;
  onUpdateRole: (id: string, newRole: CollaborationRole) => void;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export const CollaboratorComp: React.FC<CollaboratorCompProps> = ({
  collaboration,
  currentUserId,
  onUpdateRole,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}) => {
  const isSelf = collaboration.collaborator.id === currentUserId;

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateRole(collaboration.id, e.target.value as CollaborationRole);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-2">
      <div className="flex items-center space-x-4">
        {/* Avatar Placeholder or Image */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
          {collaboration.collaborator.avatarUrl ? (
            <img
              src={collaboration.collaborator.avatarUrl}
              alt={collaboration.collaborator.fullname}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            collaboration.collaborator.fullname.charAt(0)
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {collaboration.collaborator.fullname} {isSelf && "(You)"}
          </p>
          <p className="text-sm text-gray-500">
            {collaboration.collaborator.email}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Role Selector */}
        {!isSelf ? (
          <select
            value={collaboration.role}
            onChange={handleRoleChange}
            disabled={isUpdating || isDeleting}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          >
            <option value={CollaborationRole.VIEWER}>Viewer</option>
            <option value={CollaborationRole.EDITOR}>Editor</option>
            <option value={CollaborationRole.OWNER}>Owner</option>
          </select>
        ) : (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium capitalize">
            {collaboration.role}
          </span>
        )}

        {/* Delete Action */}
        {!isSelf && (
          <DangerButton
            onClick={() => onDelete(collaboration.id)}
            isLoading={isDeleting}
            disabled={isUpdating}
            className="!p-2 text-red-600 hover:bg-red-50"
            title="Remove Collaborator"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </DangerButton>
        )}
      </div>
    </div>
  );
};
