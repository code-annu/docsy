import React, { useEffect, useState } from "react";
import { Mail, Calendar, Save, X } from "lucide-react";
import { ErrorText } from "../../../../common/components/texts/ErrorText";
import { TextInputField } from "../../../../common/components/inputs/TextInputField";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import { updateProfile } from "../../state/profile-thunk";

interface ProfileUpdateCompProps {
  onCancel: () => void;
  afterUpdate: () => void;
}

export const ProfileUpdateComp: React.FC<ProfileUpdateCompProps> = ({
  onCancel,
  afterUpdate,
}) => {
  const dispatch = useAppDispatch();
  const { profile, updating, updateError } = useAppSelector(
    (state) => state.profile
  );

  const [formData, setFormData] = useState({
    fullname: "",
    about: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || "",
        about: profile.about || "",
        avatarUrl: profile.avatarUrl || "",
      });
    }
  }, [profile]);

  const handleUpdate = async () => {
    await dispatch(updateProfile(formData));
    afterUpdate();
  };

  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex justify-between items-start">
        <div className="space-y-1 w-full">
          <TextInputField
            label="Full Name"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            placeholder="Full Name"
            className="mb-2"
          />
          <TextInputField
            label="Avatar URL"
            value={formData.avatarUrl}
            onChange={(e) =>
              setFormData({ ...formData, avatarUrl: e.target.value })
            }
            placeholder="Avatar URL"
            className="mb-2"
          />

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

        <div className="flex gap-2 ml-4">
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Save size={20} />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          About
        </h3>
        <textarea
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          className="w-full bg-white border border-gray-200 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
          placeholder="Tell us about yourself..."
        />
      </div>

      {updateError && (
        <div className="mt-2 text-center">
          <ErrorText error={updateError?.error?.message || "Update failed"} />
        </div>
      )}
    </div>
  );
};
