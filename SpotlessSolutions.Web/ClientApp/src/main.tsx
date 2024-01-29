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
import Bookings from './pages/bookings-page/bookings.tsx';
import BookingsModalV2 from './pages/bookings-page/bookings-modal-v2.tsx';

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
    },
    {
        path: "/bookings",
        element: <Bookings />
    },
    {
        path: "/bookings-modal",
        element: <BookingsModalV2 />
    },
    {
        path: "/history",
        element: <History />
    }
]);

const theme = createTheme({
    palette: {
        mode: 'light'
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
)
