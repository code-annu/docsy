import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./features/authentication/ui/pages/LoginPage";
import { SignupPage } from "./features/authentication/ui/pages/SignupPage";
import { DashboardLayout } from "./common/layouts/DashboardLayout";
import { HomePage } from "./features/dashboard/pages/HomePage";
import { ProfilePage } from "./features/profile/ui/pages/ProfilePage";
import { HelpFeedbackPage } from "./features/dashboard/pages/HelpFeedbackPage";
import { SettingsPage } from "./features/dashboard/pages/SettingsPage";
import DocumentPage from "./features/documents/ui/pages/DocumentPage";
import { DocumentEditorPage } from "./features/documents/ui/pages/DocumentEditorPage";

export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
  NOTIFICATION = "/notification",
  HELP = "/help",
  SETTING = "/setting",
  DOCUMENTS = "/documents",
}

export const appRouter = createBrowserRouter([
  { path: AppRoutes.LOGIN, Component: LoginPage },
  { path: AppRoutes.SIGNUP, Component: SignupPage },
  { path: `${AppRoutes.DOCUMENTS}/:id`, Component: DocumentEditorPage },
  {
    path: AppRoutes.HOME,
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: AppRoutes.PROFILE,
        Component: ProfilePage,
      },
      {
        path: AppRoutes.HELP,
        Component: HelpFeedbackPage,
      },
      {
        path: AppRoutes.SETTING,
        Component: SettingsPage,
      },
      {
        path: AppRoutes.DOCUMENTS,
        Component: DocumentPage,
      },
    ],
  },
]);
