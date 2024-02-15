import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LandingPage from "./src/Pages/LandingPage";
import RecoverPassword from "./src/_shared/auth/Components/RecoverPassword";
import ResetPassword from "./src/_shared/auth/Components/ResetPassword";
import ResendVerificationCode from "./src/_shared/auth/Components/ResendVerificationCode";
import ConfirmVerificationCode from "./src/_shared/auth/Components/ConfirmVerificationCode";
import SignUp from "./src/_shared/auth/Components/SignUp";
import Login from "./src/_shared/auth/Components/Login";
import SearchClubs from "./src/Pages/SearchClubs";
import StudentSignUp from "./src/_shared/auth/Components/StudentSignUp";

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
            <Route path="/sign-up-as-user" element={<StudentSignUp />} />
            <Route path="/search-clubs" element={<SearchClubs />} />
        </>
    )
);