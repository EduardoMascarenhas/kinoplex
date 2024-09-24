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
import ItemsTable from 'ui-component/itemsTable';

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

const EEditDetails = ({
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
                    <Grid item xs={12}>
                        <Typography variant="h4">Contato</Typography>
                        <br />
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Nome do Contato :</Typography>

                                    <TextField
                                        value={allData?.dadosDoEvento?.nomeDoContato}
                                        onChange={(e) => handleChangeAllData(e, 'nomeDoContato', 'dadosDoEvento')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Telefone do Contato :</Typography>
                                    <TextField
                                        value={allData?.dadosDoEvento?.telefoneDoContato}
                                        onChange={(e) => handleChangeAllData(e, 'telefoneDoContato', 'dadosDoEvento')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Email do Contato :</Typography>

                                    <TextField
                                        value={allData?.dadosDoEvento?.emailDoContato}
                                        onChange={(e) => handleChangeAllData(e, 'emailDoContato', 'dadosDoEvento')}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ margin: '25px' }}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Dados da Empresa Sediadora do Evento</Typography>
                                        <Stack spacing={0} gap={2}>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">CNPJ:</Typography>

                                                    <TextField
                                                        value={allData?.empresa?.cnpj}
                                                        onChange={(e) => handleChangeAllData(e, 'cnpj', 'empresa')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Nome Fantasia:</Typography>
                                                    <TextField
                                                        value={allData?.empresa?.nomeFantasia}
                                                        onChange={(e) => handleChangeAllData(e, 'nomeFantasia', 'empresa')}
                                                    />
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
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Banco:</Typography>
                                                    <TextField
                                                        value={allData?.empresa?.banco}
                                                        onChange={(e) => handleChangeAllData(e, 'banco', 'empresa')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Agência:</Typography>
                                                    <TextField
                                                        value={allData?.empresa?.agencia}
                                                        onChange={(e) => handleChangeAllData(e, 'agencia', 'empresa')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Conta:</Typography>
                                                    <TextField
                                                        value={allData?.empresa?.conta}
                                                        onChange={(e) => handleChangeAllData(e, 'conta', 'empresa')}
                                                    />
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ margin: '25px' }}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Dados do Evento</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Nº do Evento:</Typography>
                                                    <TextField
                                                        value={allData?.dadosDoEvento?.nEvento}
                                                        onChange={(e) => handleChangeAllData(e, 'nEvento', 'dadosDoEvento')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Tipo do Evento:</Typography>
                                                    <TextField
                                                        value={allData?.dadosDoEvento?.tipoEvento}
                                                        onChange={(e) => handleChangeAllData(e, 'tipoEvento', 'dadosDoEvento')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Nome do Evento:</Typography>
                                                    <TextField
                                                        value={allData?.dadosDoEvento?.nomeEvento}
                                                        onChange={(e) => handleChangeAllData(e, 'nomeEvento', 'dadosDoEvento')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Cliente:</Typography>
                                                    <TextField
                                                        value={allData?.dadosDoEvento?.cliente}
                                                        onChange={(e) => handleChangeAllData(e, 'cliente', 'dadosDoEvento')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Responsável:</Typography>
                                                    <TextField
                                                        value={allData?.dadosDoEvento?.responsavel}
                                                        onChange={(e) => handleChangeAllData(e, 'responsavel', 'dadosDoEvento')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Descrição do Evento:</Typography>
                                                    <TextField
                                                        value={allData?.dadosDoEvento?.descricaoEvento}
                                                        onChange={(e) => handleChangeAllData(e, 'descricaoEvento', 'dadosDoEvento')}
                                                        multiline={true}
                                                        minRows={5}
                                                    />
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Detalhes do Evento</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Dia do Evento:</Typography>
                                                    <TextField
                                                        value={allData?.dataELocalizacao?.dia}
                                                        onChange={(e) => handleChangeAllData(e, 'dia', 'dataELocalizacao')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Complexo:</Typography>
                                                    <TextField
                                                        value={allData?.dataELocalizacao?.complexo}
                                                        onChange={(e) => handleChangeAllData(e, 'complexo', 'dataELocalizacao')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Convidados:</Typography>
                                                    <TextField
                                                        value={allData?.dataELocalizacao?.convidados}
                                                        onChange={(e) => handleChangeAllData(e, 'convidados', 'dataELocalizacao')}
                                                        type="number"
                                                    />
                                                </Box>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Informações de Pagamento</Typography>
                                        <Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Status:</Typography>
                                                    <Chip
                                                        label={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'Confirmado Aguardando Pagamento' : allData.dadosDoEvento.status === 'PAGO' ? 'Pago' : allData.dadosDoEvento.status === 'CANCELADO' ? 'Cancelado' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'Confirmado' : 'ERRO') : 'NULL'}`}
                                                        variant="outlined"
                                                        size="small"
                                                        chipcolor={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'secondary' : allData.dadosDoEvento.status === 'PAGO' ? 'success' : allData.dadosDoEvento.status === 'CANCELADO' ? 'error' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'primary' : 'error') : 'error'}`}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Data de Vencimento:</Typography>
                                                    <InputMask
                                                        mask="99/99/9999"
                                                        value={allData?.infoAdministrativas?.dataVencimento}
                                                        onChange={(e) => handleChangeAllData(e, 'dataVencimento', 'infoAdministrativas')}
                                                    >
                                                        {/*@ts-ignore */}
                                                        {(inputProps) => <TextField {...inputProps} fullWidth placeholder="dd/mm/aaaa" />}
                                                    </InputMask>
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Data de Pagamento:</Typography>
                                                    <InputMask
                                                        mask="99/99/9999"
                                                        value={allData?.infoAdministrativas?.dataPagamento}
                                                        onChange={(e) => handleChangeAllData(e, 'dataPagamento', 'infoAdministrativas')}
                                                    >
                                                        {/*@ts-ignore */}
                                                        {(inputProps) => <TextField {...inputProps} fullWidth placeholder="dd/mm/aaaa" />}
                                                    </InputMask>
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Forma de Pagamento:</Typography>
                                                    <TextField
                                                        value={allData?.infoAdministrativas?.formaDePagamento}
                                                        onChange={(e) => handleChangeAllData(e, 'formaDePagamento', 'infoAdministrativas')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Informações Administrativas:</Typography>
                                                    <TextField
                                                        value={allData?.infoAdministrativas?.informacoes}
                                                        onChange={(e) => handleChangeAllData(e, 'informacoes', 'infoAdministrativas')}
                                                    />
                                                </Box>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Box
                                                    sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}
                                                >
                                                    <Typography variant="subtitle1">Observação no Boleto:</Typography>
                                                    <TextField
                                                        value={allData?.infoAdministrativas?.observacaoNoBoleto}
                                                        onChange={(e) =>
                                                            handleChangeAllData(e, 'observacaoNoBoleto', 'infoAdministrativas')
                                                        }
                                                    />
                                                </Box>
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
                <ItemsTable initialItems={allData?.pacote && allData?.pacote?.length ? allData.pacote : []} />
            </Grid>
        </Grid>
    );
};

export default EEditDetails;
