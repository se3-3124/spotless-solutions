import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Home from './pages/home-page/home-page.tsx';
import SignUp from './pages/registration-page/registration-page.tsx';
import LogIn from './pages/login-page/login-page.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import RecoveryPrompt from './pages/password-recovery/recovery-prompt.tsx';
import RecoveryRecover from './pages/password-recovery/recovery-recover.tsx';
import './index.css';
import OAuthSuccess from './pages/oauth/OAuthSuccess.tsx';
import OAuthFailure from './pages/oauth/OAuthFailure.tsx';
import OAuthCatcher from './pages/oauth/OAuthCatcher.tsx';
import {createTheme, ThemeProvider} from "@mui/material";
import LogoutRedirect from "./pages/LogoutRedirect.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <LogIn />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/auth/oauth/success",
        element: <OAuthSuccess />
    },
    {
        path: "/auth/oauth/failure",
        element: <OAuthFailure />
    },
    {
        path: "/auth/oauth/catch",
        element: <OAuthCatcher />
    },
    {
        path: "/recovery",
        element: <RecoveryPrompt />
    },
    {
        path: "/recovery/change",
        element: <RecoveryRecover />
    },
    {
        path: "/logout",
        element: <LogoutRedirect />
    }
]);

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
)
