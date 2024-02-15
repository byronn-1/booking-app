import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import FrontPage from "./src/FrontPage";
import LandingPage from "./src/Pages/LandingPage";
import RecoverPassword from "./src/_shared/auth/Components/RecoverPassword";
import ResetPassword from "./src/_shared/auth/Components/ResetPassword";
import ResendVerificationCode from "./src/_shared/auth/Components/ResendVerificationCode";
import ConfirmVerificationCode from "./src/_shared/auth/Components/ConfirmVerificationCode";
import SignUp from "./src/_shared/auth/Components/SignUp";
import ProtectedRoutes from "./src/_shared/auth/Components/ProtectedRoutes";
import Login from "./src/_shared/auth/Components/Login";
import Bookings from "./src/Pages/Bookings";
import Clubs from "./src/Pages/Clubs";
import SubscribedClubs from "./src/Pages/SubscribedClubs";
import SearchClubs from "./src/Pages/SearchClubs";
import Settings from "./src/Pages/Settings";

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
                <Route path="/user-menu" element={<FrontPage />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search-clubs" element={<Clubs />} />
                <Route path="/subcribed-clubs" element={<SubscribedClubs />} />
                <Route path="/search-clubs" element={<SearchClubs />} />
            </Route>
        </>
    )
    , {
        basename: '/user',
    }
);