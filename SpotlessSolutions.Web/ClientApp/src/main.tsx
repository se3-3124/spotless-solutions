import {createTheme, ThemeProvider} from "@mui/material";
import axios from 'axios';
import * as jose from 'jose';
import {useEffect, useState} from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes,} from 'react-router-dom';

import AuthContext from "./contexts/AuthContext.ts";

import {UserData, UserRole} from "./types/AuthenticationContextType.tsx";

import Dashboard from './pages/dashboard/Dashboard.tsx';
import DashboardBookingCalendarView from "./pages/dashboard/DashboardBookingCalendarView.tsx";
import Home from './pages/home-page/home-page.tsx';
import LogIn from './pages/login-page/login-page.tsx';
import LogoutRedirect from "./pages/LogoutRedirect.tsx";
import RecoveryPrompt from './pages/password-recovery/recovery-prompt.tsx';
import RecoveryRecover from './pages/password-recovery/recovery-recover.tsx';
import SignUp from './pages/registration-page/registration-page.tsx';
import OAuthSuccess from './pages/oauth/OAuthSuccess.tsx';
import OAuthFailure from './pages/oauth/OAuthFailure.tsx';
import OAuthCatcher from './pages/oauth/OAuthCatcher.tsx';

import './index.css';
import DashboardBookingsWorkflowView from "./pages/dashboard/DashboardBookingsWorkflowVew.tsx";

const theme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
});

function Main() {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('sst');
        const refreshToken = localStorage.getItem('ssr');

        if (!token || !refreshToken) {
            localStorage.clear();
            return;
        }
        
        setAuthenticatedUser(token, refreshToken);
    }, []);
    
    const setAuthenticatedUser = (token: string, refreshToken: string): boolean => {
        try {
            const tokenData = jose.decodeJwt(token);
            if (!tokenData) {
                return false;
            }

            setUser({
                firstName: tokenData['first_name'] as string,
                lastName: tokenData['last_name'] as string,
                role: tokenData['user_role'] === "1" ? UserRole.User : UserRole.Administrator,
                token: token,
                refreshToken: refreshToken
            });

            localStorage.setItem('sst', token);
            localStorage.setItem('ssr', refreshToken);
        } catch (e) {
            return false;
        }
 
        return true;
    }
    
    const removeAuthenticationTokens = (): void => {
        localStorage.clear();
        setUser(null);
    }

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{
                user,
                setAuthenticatedUser,
                removeAuthenticationTokens,
                request: user !== null ? axios.create({
                    baseURL: window.location.origin,
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }) : null
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />

                        {/* Account Recovery */}
                        <Route path="/recovery" element={<RecoveryPrompt />} />
                        <Route path="/recovery/change" element={<RecoveryRecover />} />

                        {/* Auth related routes */}
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/logout" element={<LogoutRedirect />} />

                        {/* OAuth Token stuff */}
                        <Route path="/auth/oauth/success" element={<OAuthSuccess />} />
                        <Route path="/auth/oauth/failure" element={<OAuthFailure />} />
                        <Route path="/auth/oauth/catch" element={<OAuthCatcher />} />

                        {/* Dashboard */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/dashboard/calendar" element={<DashboardBookingCalendarView />} />
                        <Route path="/dashboard/calendar-workflow" element={<DashboardBookingsWorkflowView />} />

                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Main />
);
