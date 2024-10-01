import { Link } from 'react-router-dom';

// material-ui
import { Theme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';
import LogoKino from 'ui-component/LogoKino';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const { isLoggedIn } = useAuth();
    const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 0 }}>
                                        <Link to="#" aria-label="logo">
                                        <LogoKino />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={{ xs: 'column-reverse', md: 'row' }}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={{ xs: 'center', md: 'inherit' }}
                                                    >
                                                        Digite seu login e senha para continuar
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Não possui conta?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
