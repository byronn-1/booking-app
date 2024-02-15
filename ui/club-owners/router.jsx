import {
  Navigate,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import FrontPage from './src/FrontPage.jsx'
import Bookings from "./src/Pages/Bookings.jsx";
import WeekTemplates from "./src/Pages/WeekTemplates.jsx";
import CreateWeekTemplate from "./src/Pages/CreateWeekTemplate.jsx";
import CreateSession from "./src/Pages/CreateSession.jsx";
import CreateWeekSessionsTemplate from "./src/Pages/CreateWeekSessionsTemplate.jsx";
import CreateCoach from "./src/Pages/CreateCoach.jsx";

import Login from "./src/_shared/auth/Components/Login.jsx";
import SignUp from "./src/_shared/auth/Components/SignUp.jsx";
import RecoverPassword from "./src/_shared/auth/Components/RecoverPassword.jsx";
import ResetPassword from "./src/_shared/auth/Components/ResetPassword.jsx";
import ResendVerificationCode from "./src/_shared/auth/Components/ResendVerificationCode.jsx";
import ConfirmVerificationCode from "./src/_shared/auth/Components/ConfirmVerificationCode.jsx";

import ProtectedRoutes from "./src/_shared/auth/Components/ProtectedRoutes.jsx";
import LandingPage from "./src/Pages/LandingPage.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recover-password" element={<RecoverPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/resend-code" element={<ResendVerificationCode />} />
      <Route
        path="/confirm-verification-code"
        element={<ConfirmVerificationCode />}
      />
      <Route path="/sign-up-as-owner" element={<SignUp />} />
      <Route element={<ProtectedRoutes />} >
        <Route path="/owner-menu" element={<FrontPage />} />
        <Route path="/bookings" element={<Bookings pageName="Bookings" />} />
        <Route path="/add-coach" element={<CreateCoach pageName="Add Coach" />} />
        <Route path="/create-session" element={<CreateSession pageName="Create Session" />} />
        <Route path="/week-templates" element={<WeekTemplates pageName="Week Templates" />} />
        <Route path="/create-week-template" element={<CreateWeekTemplate pageName="Create Week Template" />} />
        <Route path="/create-week-sessions-template" element={<CreateWeekSessionsTemplate pageName="Create Week Sessions Template" />} />
      </Route>
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </>
  ), {
  basename: '/owner',
}
);