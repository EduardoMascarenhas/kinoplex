import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// project import
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter(
    [
        {
            path: '/',
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            )
        },
        AuthenticationRoutes,
        LoginRoutes,
        MainRoutes
    ],
    {
        basename: import.meta.env.VITE_APP_BASE_NAME
    }
);

export default router;
