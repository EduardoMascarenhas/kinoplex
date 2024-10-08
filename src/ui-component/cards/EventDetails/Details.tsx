import React from 'react';

// material-ui
import { Divider, Grid, Stack, Typography, Box } from '@mui/material';

// project imports
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// types
import { EventDataType } from 'types/event';
import ItemsTable from 'ui-component/cards/EditEvent/itemsTable';
import SubCardCustom from 'ui-component/custom/SubCardCustom';

const EDetails = ({
    allData,
    handleChangeAllData
}: {
    allData: EventDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCardCustom allData={allData}>
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
                                        <Typography variant="subtitle1">Telefone do Contato :</Typography>

                                        <Typography variant="body2">{`${
                                            allData?.dadosDoEvento?.telefoneDoContato
                                                ? allData?.dadosDoEvento?.telefoneDoContato
                                                : 'Não Informado'
                                        }`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Email do Contato :</Typography>

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
                </SubCardCustom>
            </Grid>
            <Grid item xs={12}>
                <ItemsTable initialItems={allData?.pacote && allData?.pacote?.length ? allData.pacote : []} details={true} />
            </Grid>
        </Grid>
    );
};

export default EDetails;
