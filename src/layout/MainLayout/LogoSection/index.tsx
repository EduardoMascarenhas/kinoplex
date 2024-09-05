import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
// import { DASHBOARD_PATH } from 'config';
import { INVITATIONS_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={INVITATIONS_PATH} aria-label="theme-logo">
        <Logo />
    </Link>
);

export default LogoSection;
