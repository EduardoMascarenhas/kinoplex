import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    TextField,
    Button
} from '@mui/material';
// input mask
import InputMask from 'react-input-mask';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// assets
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

// types
import { ThemeMode } from 'types/config';
import { EventDataType } from 'types/event';

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

const EDetails = ({
    allData,
    handleChangeAllData
}: {
    allData: EventDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    const theme = useTheme();
    // Calcular o total dos valores do pacote
    const totalSum = allData?.pacote?.reduce((acc, row) => acc + row.valorTotal, 0) || 0;

    const [editableField, setEditableField] = useState<string | null>(null);

    const toggleEditableField = (field: string) => {
        setEditableField(editableField === field ? null : field);
    };

    const handleSaveClick = () => {
        // Salva os dados e desativa os campos
        setEditableField(null);
        console.log('allData: ', allData);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard
                    title={`Id do Evento - ${allData.id}`}
                    secondary={<Typography variant="subtitle1">Data de Criação do Evento - {`${allData.createdAt}`}</Typography>}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Contato</Typography>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Nome do Contato :</Typography>

                                        <Typography variant="body2">{`${
                                            allData?.dadosDoEvento?.nomeDoContato ? allData?.dadosDoEvento?.nomeDoContato : 'Não Informado'
                                        }`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Nome do Contato :</Typography>

                                        <Typography variant="body2">{`${
                                            allData?.dadosDoEvento?.telefoneDoContato
                                                ? allData?.dadosDoEvento?.telefoneDoContato
                                                : 'Não Informado'
                                        }`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Nome do Contato :</Typography>

                                        <Typography variant="body2">{`${
                                            allData?.dadosDoEvento?.emailDoContato
                                                ? allData?.dadosDoEvento?.emailDoContato
                                                : 'Não Informado'
                                        }`}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Dados da Empresa Sediadora do Evento</Typography>
                                        <Stack spacing={0} gap={2}>
                                            <Stack direction="row" spacing={1}>
                                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                                    <Typography variant="subtitle1">CNPJ:</Typography>

                                                    <Typography variant="body2">{`${
                                                        allData?.empresa?.cnpj ? allData?.empresa?.cnpj : 'Não Informado'
                                                    }`}</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                                    <Typography variant="subtitle1">Nome Fantasia:</Typography>
                                                    <Typography variant="body2">{`${
                                                        allData?.empresa?.nomeFantasia ? allData?.empresa?.nomeFantasia : 'Não Informado'
                                                    }`}</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Dados Bancários da Empresa</Typography>
                                        <Stack spacing={0} gap={2}>
                                            <Stack direction="row" spacing={1}>
                                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                                    <Typography variant="subtitle1">Banco:</Typography>
                                                    <Typography variant="body2">{`${
                                                        allData?.empresa?.banco ? allData?.empresa?.banco : 'Não Informado'
                                                    }`}</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                                    <Typography variant="subtitle1">Agência:</Typography>
                                                    <Typography variant="body2">{`${
                                                        allData?.empresa?.agencia ? allData?.empresa?.agencia : 'Não Informado'
                                                    }`}</Typography>
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                                    <Typography variant="subtitle1">Conta:</Typography>
                                                    <Typography variant="body2">{`${
                                                        allData?.empresa?.conta ? allData?.empresa?.conta : 'Não Informado'
                                                    }`}</Typography>
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Dados do Evento</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Nº do Evento:</Typography>
                                                <Typography variant="body2">{`${allData?.dadosDoEvento?.nEvento ? allData.dadosDoEvento.nEvento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Tipo do Evento:</Typography>
                                                <Typography variant="body2">{`${allData?.dadosDoEvento?.tipoEvento ? allData.dadosDoEvento.tipoEvento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Nome do Evento:</Typography>
                                                <Typography variant="body2">{`${allData?.dadosDoEvento?.nomeEvento ? allData.dadosDoEvento.nomeEvento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Cliente:</Typography>
                                                <Typography variant="body2">{`${allData?.dadosDoEvento?.cliente ? allData.dadosDoEvento.cliente : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Responsável:</Typography>
                                                <Typography variant="body2">{`${allData?.dadosDoEvento?.responsavel ? allData.dadosDoEvento.responsavel : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Descrição do Evento:</Typography>
                                                <Typography variant="body2">{`${allData?.dadosDoEvento?.descricaoEvento ? allData.dadosDoEvento.descricaoEvento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Detalhes do Evento</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Dia do Evento:</Typography>
                                                <Typography variant="body2">{`${allData?.dataELocalizacao?.dia ? allData.dataELocalizacao.dia : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Complexo:</Typography>
                                                <Typography variant="body2">{`${allData?.dataELocalizacao?.complexo ? allData.dataELocalizacao.complexo : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Convidados:</Typography>
                                                <Typography variant="body2">{`${allData?.dataELocalizacao?.convidados ? allData.dataELocalizacao.convidados : 'Não Informado'}`}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Informações de Pagamento</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Status:</Typography>
                                                <Chip
                                                    label={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'Confirmado Aguardando Pagamento' : allData.dadosDoEvento.status === 'PAGO' ? 'Pago' : allData.dadosDoEvento.status === 'CANCELADO' ? 'Cancelado' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'Confirmado' : 'ERRO') : 'NULL'}`}
                                                    variant="outlined"
                                                    size="small"
                                                    chipcolor={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'secondary' : allData.dadosDoEvento.status === 'PAGO' ? 'success' : allData.dadosDoEvento.status === 'CANCELADO' ? 'error' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'primary' : 'error') : 'error'}`}
                                                />
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Data de Vencimento:</Typography>
                                                <Typography variant="body2">{`${allData?.infoAdministrativas?.dataVencimento ? allData.infoAdministrativas.dataVencimento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Data de Pagamento:</Typography>
                                                <Typography variant="body2">{`${allData?.infoAdministrativas?.dataPagamento ? allData.infoAdministrativas.dataPagamento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Forma de Pagamento:</Typography>
                                                <Typography variant="body2">{`${allData?.infoAdministrativas?.formaDePagamento ? allData.infoAdministrativas.formaDePagamento : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Informações Administrativas:</Typography>
                                                <Typography variant="body2">{`${allData?.infoAdministrativas?.informacoes ? allData.infoAdministrativas.informacoes : 'Não Informado'}`}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Observação no Boleto:</Typography>
                                                <Typography variant="body2">{`${allData?.infoAdministrativas?.observacaoNoBoleto ? allData.infoAdministrativas.observacaoNoBoleto : 'Não Informado'}`}</Typography>
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
                <SubCard title="Pacote" content={false}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Nº</TableCell>
                                            <TableCell align="left">Tipo / Item</TableCell>
                                            <TableCell align="center">Quantidade</TableCell>
                                            <TableCell align="center">Valor Unitário</TableCell>
                                            <TableCell align="center">Valor Total</TableCell>
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
                                                <TableCell align="center">R$ {row.valorUnitario}</TableCell>
                                                <TableCell align="center">R$ {row.valorTotal}</TableCell>
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
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="subtitle1">
                                                            Sub Total :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography align="right" variant="body2">
                                                            R$ {totalSum.toFixed(2)}
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
                                                <Divider sx={{ bgcolor: 'dark.main' }} />
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
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default EDetails;
