import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 1 routing
const AuthLogin1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/Login1')));
const AuthRegister1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/Register1')));
const AuthForgotPassword1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/ForgotPassword1')));
const AuthCheckMail1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/CheckMail1')));
const AuthResetPassword1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/ResetPassword1')));
const AuthCodeVerification1 = Loadable(lazy(() => import('views/pages/authentication/authentication1/CodeVerification1')));

// login option 2 routing
const AuthLogin2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/Login2')));
const AuthRegister2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/Register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/ForgotPassword2')));
const AuthCheckMail2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/CheckMail2')));
const AuthResetPassword2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/ResetPassword2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('views/pages/authentication/authentication2/CodeVerification2')));

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));
const AuthCheckMail3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CheckMail3')));
const AuthResetPassword3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/ResetPassword3')));
const AuthCodeVerification3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/CodeVerification3')));

// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('views/pages/maintenance/Error')));
const MaintenanceError500 = Loadable(lazy(() => import('views/pages/maintenance/Error500')));
const MaintenanceComingSoon1 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon1')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('views/pages/maintenance/UnderConstruction')));

// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const PagesContactUS = Loadable(lazy(() => import('views/pages/contact-us')));
const PagesFaqs = Loadable(lazy(() => import('views/pages/saas-pages/Faqs')));
const PagesPrivacyPolicy = Loadable(lazy(() => import('views/pages/saas-pages/PrivacyPolicy')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: []
};

export default AuthenticationRoutes;
