import React, { useState } from "react";
import { User, Edit2, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../app/app-hook";
import { deleteProfile } from "../../state/profile-thunk";
import { DangerButton } from "../../../../common/components/buttons/DangerButton";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../router";
import { logout } from "../../../authentication/state/auth-slice";
import { ProfileViewComp } from "../components/ProfileViewComp";
import { ProfileUpdateComp } from "../components/ProfileUpdateComp";
import { resetProfile } from "../../state/profile-slice";

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, deleting } = useAppSelector((state) => state.profile);

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      await dispatch(deleteProfile());
      dispatch(logout());
      dispatch(resetProfile());
      navigate(AppRoutes.LOGIN);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
        <div className="relative flex flex-col md:flex-row gap-8 items-start pt-12">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-white shadow-lg p-1">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullname}
                  className="w-full h-full object-cover rounded-xl bg-gray-100"
                />
              ) : (
                <div className="w-full h-full bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                  <User size={48} />
                </div>
              )}
            </div>
            {isEditing && (
              <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-lg shadow-md border border-gray-100">
                <Edit2 size={16} className="text-gray-500" />
              </div>
            )}
          </div>

          {/* Info Component */}
          {isEditing ? (
            <ProfileUpdateComp
              onCancel={() => setIsEditing(false)}
              afterUpdate={() => setIsEditing(false)}
            />
          ) : (
            <ProfileViewComp onEdit={() => setIsEditing(true)} />
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <Trash2 size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
            <p className="text-gray-500 text-sm">
              Irreversible actions for your account
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
          <div>
            <h3 className="font-semibold text-red-900">Delete Account</h3>
            <p className="text-red-700 text-sm">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <DangerButton onClick={handleDelete} isLoading={deleting}>
            Delete Account
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
