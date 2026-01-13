import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideNavbar } from "../components/navbar/SideNavbar";
import { useAppSelector, useAppDispatch } from "../../app/app-hook";
import { getProfile } from "../../features/profile/state/profile-thunk";
import { StorageUtil } from "../../util/StorageUtil";
import { refreshToken } from "../../features/authentication/state/auth-thunk";
import { AppRoutes } from "../../router";
import { useNavigate } from "react-router-dom";
import { CircularLoadingBar } from "../components/progress/CircularLoadingBar";

export const DashboardLayout: React.FC = () => {
  const { profile, profileFetchingError, isLoading } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  if (isLoading && !profile) {
    return (
      <div className="h-screen">
        <CircularLoadingBar />
      </div>
    );
  }

  if (profileFetchingError) {
    const token = StorageUtil.getRefreshToken();
    if (token) {
      dispatch(refreshToken(token))
        .then(() => {
          dispatch(getProfile());
        })
        .catch(() => {
          navigate(AppRoutes.LOGIN);
        });
    } else {
      navigate(AppRoutes.LOGIN);
    }
  }

  if (!profile) return;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 h-full">
        <SideNavbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
