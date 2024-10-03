import React, { useRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
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
import Logo from 'ui-component/Logo';
import { gridSpacing } from 'store/constant';

// types
import { ThemeMode } from 'types/config';
import { EventDataType } from 'types/event';

const EInvoice = ({
    allData,
    handleChangeAllData
}: {
    allData: EventDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    const theme = useTheme();
    const componentRef: React.Ref<HTMLDivElement> = useRef(null);
    // Calcular o total dos valores do pacote
    const totalSum = allData?.pacote?.reduce((acc, row) => acc + row.valorTotal, 0) || 0;

    return (
        <Grid container justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={10} lg={8} ref={componentRef}>
                <SubCard
                    darkTitle
                    title={`${allData?.dadosDoEvento?.nomeEvento ? 'Evento: ' + allData.dadosDoEvento.nomeEvento : 'Não Informado'}`}
                    secondary={<Logo />}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item sm={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Dados do Evento:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Nº do Evento:{' '}
                                                        {`${allData?.dadosDoEvento?.nEvento ? allData.dadosDoEvento.nEvento : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Tipo do Evento:{' '}
                                                        {`${allData?.dadosDoEvento?.tipoEvento ? allData.dadosDoEvento.tipoEvento : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Cliente:{' '}
                                                        {`${allData?.dadosDoEvento?.cliente ? allData.dadosDoEvento.cliente : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Responsável:{' '}
                                                        {`${allData?.dadosDoEvento?.responsavel ? allData.dadosDoEvento.responsavel : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    Descrição do Evento:{' '}
                                                    {`${allData?.dadosDoEvento?.descricaoEvento ? allData.dadosDoEvento.descricaoEvento : 'Não Informado'}`}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Dados de Contato:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Nome:{' '}
                                                        {`${allData?.dadosDoEvento?.nomeDoContato ? allData.dadosDoEvento.nomeDoContato : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Email:{' '}
                                                        {`${allData?.dadosDoEvento?.emailDoContato ? allData.dadosDoEvento.emailDoContato : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Telefone:{' '}
                                                        {`${allData?.dadosDoEvento?.telefoneDoContato ? allData.dadosDoEvento.telefoneDoContato : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Dados Bancários da Empresa:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        CNPJ: {`${allData?.empresa?.cnpj ? allData.empresa.cnpj : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Nome Fantasia:{' '}
                                                        {`${allData?.empresa?.nomeFantasia ? allData.empresa.nomeFantasia : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Banco: {`${allData?.empresa?.banco ? allData.empresa.banco : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Agência:{' '}
                                                        {`${allData?.empresa?.agencia ? allData.empresa.agencia : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Conta: {`${allData?.empresa?.conta ? allData.empresa.conta : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={6}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Detalhes do Evento:</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Data:{' '}
                                                        {`${allData?.dataELocalizacao?.dia ? allData.dataELocalizacao.dia : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Complexo:{' '}
                                                        {`${allData?.dataELocalizacao?.complexo ? allData.dataELocalizacao.complexo : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="body2">
                                                        Convidados:{' '}
                                                        {`${allData?.dataELocalizacao?.convidados ? allData.dataELocalizacao.convidados : 'Não Informado'}`}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table
                                    sx={{
                                        '& tr:last-of-type td': {
                                            borderBottom: 'none'
                                        },
                                        '& thead tr th': {
                                            borderBottom: 'none'
                                        },
                                        '& th:first-of-type, & td:first-of-type': {
                                            pl: { xs: 2.5, md: 5 }
                                        },
                                        '& th:last-of-type, & td:last-of-type': {
                                            pr: { xs: 6.25, md: 8.75 }
                                        }
                                    }}
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ pl: 3 }}>Nº</TableCell>
                                            <TableCell align="right">Tipo / Item</TableCell>
                                            <TableCell align="right">Quantidade</TableCell>
                                            <TableCell align="right">Valor Unitário</TableCell>
                                            <TableCell align="right">Valor Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allData?.pacote?.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{row.id}</TableCell>
                                                <TableCell align="left">
                                                    <Typography variant="subtitle1">{row.tipo}</Typography>
                                                    <Typography variant="body2">{row.item}</Typography>
                                                </TableCell>
                                                <TableCell align="center">{row.quantidade}</TableCell>
                                                <TableCell align="center">R$ {row.valorUnitario.toFixed(2)}</TableCell>
                                                <TableCell align="center">R$ {row.valorTotal.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light' }}>
                                <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Sub Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            R$ {totalSum}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Taxa (5%) :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2" color={'error'}>
                                                            R$ {(totalSum * 0.05).toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Desconto (5%) :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2" color={'primary'}>
                                                            R$ {(totalSum * 0.05).toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" color="primary" variant="subtitle1">
                                                            R$ {totalSum.toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Termos e Condições :</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        lorem ipsum dolor sit connecter adieu siccing eliot, sed do elusion tempore incident ut laborer et
                                        dolors magna aliquot.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={10} lg={8}>
                <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    sx={{
                        maxWidth: 850,
                        mx: 'auto',
                        mt: 0,
                        mb: 2.5,
                        '& > .MuiCardContent-root': {
                            py: { xs: 3.75, md: 5.5 },
                            px: { xs: 2.5, md: 5 }
                        }
                    }}
                >
                    <Grid item>
                        <AnimateButton>
                            <ReactToPrint
                                trigger={() => <Button variant="contained">Imprimir</Button>}
                                content={() => componentRef.current}
                            />
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EInvoice;
