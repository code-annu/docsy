import React from "react";
import { Mail, Calendar, Edit2 } from "lucide-react";
import { useAppSelector } from "../../../../app/app-hook";

interface ProfileViewCompProps {
  onEdit: () => void;
}

export const ProfileViewComp: React.FC<ProfileViewCompProps> = ({ onEdit }) => {
  const { profile } = useAppSelector((state) => state.profile);

  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">
            {profile?.fullname}
          </h1>
          <div className="flex items-center gap-2 text-gray-500">
            <Mail size={16} />
            <span>{profile?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={16} />
            <span>
              Joined{" "}
              {profile?.joinedAt
                ? new Date(profile.joinedAt).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <Edit2 size={20} />
        </button>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          About
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {profile?.about || "No bio added yet."}
        </p>
      </div>
    </div>
  );
};
