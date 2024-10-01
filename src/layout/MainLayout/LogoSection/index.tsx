import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
// import { DASHBOARD_PATH } from 'config';
import { INVITATIONS_PATH } from 'config';
import LogoKino from 'ui-component/LogoKino';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={INVITATIONS_PATH} aria-label="theme-logo">
        <LogoKino />
    </Link>
);

export default LogoSection;
