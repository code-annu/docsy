import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FileText, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { SideNavButton } from "../buttons/SideNavButton";
import { DangerButton } from "../buttons/DangerButton";
import { useAppDispatch } from "../../../app/app-hook";
import { logout } from "../../../features/authentication/state/auth-slice";
import { AppRoutes } from "../../../router";
import { resetProfile } from "../../../features/profile/state/profile-slice";

export const SideNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetProfile());
    navigate(AppRoutes.LOGIN);
  };

  const navItems = [
    {
      section: "main",
      items: [
        {
          label: "Documents",
          icon: <FileText size={20} />,
          path: AppRoutes.DOCUMENTS,
        },
        { label: "Profile", icon: <User size={20} />, path: AppRoutes.PROFILE },
      ],
    },
    {
      section: "secondary",
      items: [
        { label: "Settings", icon: <Settings size={20} />, path: AppRoutes.SETTING },
        {
          label: "Help & Feedback",
          icon: <HelpCircle size={20} />,
          path: AppRoutes.HELP,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 py-6 px-4">
      {/* Logo or Brand */}
      <div
        className="mb-8 px-2 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(AppRoutes.HOME)}
      >
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
        <span className="text-xl font-bold text-gray-800">Docsy</span>
      </div>

      <nav className="flex-1 flex flex-col gap-6">
        {/* Main Section */}
        <div className="flex flex-col gap-2">
          {navItems[0].items.map((item) => (
            <SideNavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              isExpanded={true}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-200 mx-2" />

        {/* Secondary Section */}
        <div className="flex flex-col gap-2">
          {navItems[1].items.map((item) => (
            <SideNavButton
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              isExpanded={true}
            />
          ))}
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <DangerButton
          onClick={handleLogout}
          className="w-full justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </DangerButton>
      </div>
    </div>
  );
};
