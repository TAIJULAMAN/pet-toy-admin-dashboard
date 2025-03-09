import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import ForgetPassword from "../pages/auth/ForgetPassword";
import VerificationCode from "../pages/auth/VerificationCode";
import ResetPassword from "../pages/auth/ResetPassword";
import MainLayout from "../layout/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import AboutUs from "../pages/settings/AboutUs";
import Settings from "../pages/settings/Settings";
import PrivacyPolicy from "../pages/settings/PrivacyPolicy";
import TermsCondition from "../pages/settings/TermsCondition";
import FAQ from "../pages/settings/FAQ";
import UserDetails from "../pages/userDetails/UserDetails";
import Services from "../pages/services/Services";
import Chat from "../pages/chat/Chat";
import Roles from "../pages/role/Role";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verification-code",
    element: <VerificationCode />,
  },
  {
    path: "/new-password",
    element: <ResetPassword />,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },

      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/roles",
        element: <Roles />,
      },
      {
        path: "/user-details",
        element: <UserDetails />,
      },

      // settings
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/setting/faq",
        element: <FAQ />,
      },
      {
        path: "/setting/about-us",
        element: <AboutUs />,
      },
      {
        path: "/setting/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/setting/terms-and-condition",
        element: <TermsCondition />,
      },

      //  navbar profile

      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
