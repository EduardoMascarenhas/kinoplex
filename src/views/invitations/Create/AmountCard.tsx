// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';

// types
import { ThemeMode } from 'types/config';
import { ConviteQuantia } from 'types/convite';

// ==============================|| INVOICE - AMOUNT CARD ||============================== //

function AmountCard({ allAmounts }: { allAmounts: ConviteQuantia }) {
    const theme = useTheme();

    return (
        <SubCard sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light' }}>
            <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography fontSize={16} align="right" color="primary" variant="subtitle1">
                                        Total: R$ {Math.round(allAmounts.quantiaTotal * 100) / 100}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
}

export default AmountCard;
