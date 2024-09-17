// material-ui
import {styled} from '@mui/material/styles';

import LogoKinoplex from 'assets/images/logo-kinoplex.png';

// ==============================|| LOGO PNG ||============================== //
interface PropsLogo {
    margem?: string
}
const Image = styled('img')({
    maxWidth: '160px',
    maxHeight: '26px',
    marginTop: '8px',
})
const LogoKino = ({margem}: PropsLogo) => {
    return (
       <Image src={`${LogoKinoplex}`} style={{marginBottom: margem}} title='Logo Kinoplex'/>
    );
};

export default LogoKino;
