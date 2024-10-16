import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import ReactToPrint from 'react-to-print';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import Logo from 'ui-component/Logo';

import { gridSpacing } from 'store/constant';

// types
import { ThemeMode } from 'types/config';
import LogoKino from 'ui-component/LogoKino';

// table data
function createData(description: string, quantity: string, amount: string, total: string) {
    return { description, quantity, amount, total };
}

const rows = [
    createData('Eletrônico', '100', 'R$ 20,00', 'R$ 2.000,00'),
    createData('Impresso', '300', 'R$ 20,00', 'R$ 6.000,00'),
    createData('Impresso', '500', 'R$ 20,00', 'R$ 10.000,00')
];

// ==============================|| INVOICE DETAILS - INVOICE ||============================== //

const TabOportunidade = () => {
    const theme = useTheme();
    const componentRef: React.Ref<HTMLDivElement> = useRef(null);

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                <SubCard darkTitle title="Nota de Débito #125863" secondary={<LogoKino />}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Dados do cliente</Typography>
                                    <Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Nome/Razão Social:</Typography>
                                            <Typography variant="body2">
                                                Laboratorio de Analises Clinicas Dr. Roberto Franco do Amaral Ltda
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">CNPJ/CPF:</Typography>
                                            <Typography variant="body2">12.345.678/0001-00</Typography>
                                        </Stack>
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

                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Dados de Contato</Typography>
                                    <Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Nome:</Typography>
                                            <Typography variant="body2">Rafael Marotta</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">E-mail:</Typography>
                                            <Typography component={Link} to="#" variant="body2" color="primary">
                                                demo@exemplo.com.br
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Telefone:</Typography>
                                            <Typography variant="body2">55+ (11) 97070-7070</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={0}>
                                <Stack spacing={1}>
                                    <Typography variant="h4">Dados de pagamento</Typography>
                                    <Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Forma de pagamento:</Typography>
                                            <Typography variant="body2">Boleto bancário</Typography>
                                        </Stack>
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
                        </Grid>
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
                                                            Total: R$ 18.000,00
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
            <Grid item xs={12} lg={8}>
                <Stack direction="row" justifyContent="center">
                    <AnimateButton>
                        <ReactToPrint trigger={() => <Button variant="contained">Imprimir</Button>} content={() => componentRef.current} />
                    </AnimateButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default TabOportunidade;
