// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';

import { gridSpacing } from 'store/constant';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';

// types
import { ThemeMode } from 'types/config';
import { TextoLimitado } from '../ListarOportunidades/TabelaOportunidades';
import Tooltip from '@mui/material/Tooltip';

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

// table data
function createData(description: string, quantity: string, amount: string, total: string) {
    return { description, quantity, amount, total };
}

const rows = [
    createData('Eletrônico', '100', 'R$ 20,00', 'R$ 2.000,00'),
    createData('Impresso', '300', 'R$ 20,00', 'R$ 6.000,00'),
    createData('Impresso', '500', 'R$ 20,00', 'R$ 10.000,00')
];

// ==============================|| INVOICE DETAILS - DETAILS ||============================== //

const TabDetalhe = () => {
    const theme = useTheme();

    const sxDivider = {
        borderColor: theme.palette.mode === ThemeMode.DARK ? 'divider' : 'primary.light'
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="Cliente" secondary={<Typography variant="subtitle1">Criado em 19/09/2024 10:00</Typography>}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <Tooltip title="Laboratorio de Analises Clinicas Dr. Roberto Franco do Amaral Ltda">
                                        <TextoLimitado texto={'Laboratorio de Analises Clinicas Dr. Roberto Franco do Amaral Ltda'} limite={30} />
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <strong>CNPJ/CPF:</strong> 12.345.678/0001-00
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <PhoneAndroidTwoToneIcon sx={detailsIconSX} /> 55+ (11) 98229-3799
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <EmailTwoToneIcon sx={detailsIconSX} /> unovaes@scale.com.br
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={sxDivider} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Dados de pagamento</Typography>
                                        <Stack spacing={0}>
                                            <Typography variant="h6" sx={{ mb: 1 }}>
                                                Boleto Bancário
                                            </Typography>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Valor Total:</Typography>
                                                <Typography variant="body2">R$ 25.000,00</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Status de Pagamento:</Typography>
                                                <Chip label="Pago" variant="outlined" size="small" chipcolor="success" />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                <Stack spacing={2}>
                                        <Typography variant="h4">Endereço do cliente</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Endereço:</Typography>
                                                <Typography variant="body2">Rua Reverendo Guilherme Kerr, 200 Nova Campinas</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Cidade:</Typography>
                                                <Typography variant="body2">Campinas - SP</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Estado:</Typography>
                                                <Typography variant="body2">São Paulo</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">País:</Typography>
                                                <Typography variant="body2">Brasil</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">CEP:</Typography>
                                                <Typography variant="body2">13092-139</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard title="Oportunidades" content={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ pl: 3 }}>Tipo de Convite</TableCell>
                                            <TableCell align="right">Quantidade</TableCell>
                                            <TableCell align="right">Preço unitário</TableCell>
                                            <TableCell align="right">Total</TableCell>
                                            <TableCell align="right" sx={{ pr: 3 }} />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ pl: 3 }}>
                                                    <Typography variant="body2">{row.description}</Typography>
                                                </TableCell>
                                                <TableCell align="right">{row.quantity}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right">{row.total}</TableCell>
                                                <TableCell sx={{ pr: 3 }} align="right">
                                                    <IconButton color="error" size="large" aria-label="item-Delete">
                                                        <DeleteTwoToneIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard sx={{ mx: 3, mb: 3, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light' }}>
                                <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            Total:  R$ 18.000,00
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default TabDetalhe;
