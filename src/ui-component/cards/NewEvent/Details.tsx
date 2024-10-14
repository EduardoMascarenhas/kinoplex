import React, { useState } from 'react';

// material-ui
import { Divider, Grid, Stack, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// input mask
import InputMask from 'react-input-mask';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
// types
import { EventDataType } from 'types/event';
import ItemsTable from 'ui-component/cards/EditEvent/itemsTable';

import events from 'api/events.json'; // Importando o JSON local

const eventTypeList = ['Tipo 1', 'Tipo 2', 'Tipo 3', 'Tipo 4'];

const ENewDetails = () => {
    const [allData, setAllData] = useState<EventDataType>({
        id: '',
        createdAt: '',
        empresa: {
            cnpj: '',
            nomeFantasia: '',
            banco: '',
            agencia: '',
            conta: ''
        },
        dataELocalizacao: {
            dia: '',
            complexo: '',
            convidados: +0
        },
        dadosDoEvento: {
            nEvento: '',
            status: '',
            tipoEvento: '',
            nomeEvento: '',
            cliente: '',
            nomeDoContato: '',
            emailDoContato: '',
            telefoneDoContato: '',
            responsavel: '',
            descricaoEvento: ''
        },
        pacote: [
            {
                id: +0,
                tipo: '',
                item: '',
                quantidade: +0,
                valorUnitario: +0,
                valorTotal: +0
            }
        ],
        infoAdministrativas: {
            dataVencimento: '',
            dataPagamento: '',
            formaDePagamento: '',
            informacoes: '',
            observacaoNoBoleto: ''
        },
        boletos: [
            {
                nBoleto: '',
                pagador: '',
                beneficiario: '',
                valorPago: +0,
                status: ''
            }
        ],
        observacoesGerais: [
            {
                id: '',
                createdAt: '',
                updatedAt: '',
                observacao: '',
                titulo: ''
            }
        ],
        historicoComentarios: [
            {
                id: '',
                createdAt: '',
                updatedAt: '',
                comentario: '',
                userName: ''
            }
        ]
    });
    const [selectedClient, setSelectedClient] = useState('SELECIONAR');
    const [eventType, setSelectedEventType] = useState('SELECIONAR');
    // Função para alterar o estado do filtro de cliente
    const handleClientChange = (event: any) => {
        const thisClient = event.target.value;
        if (thisClient === 'SELECIONAR') {
            setSelectedClient('SELECIONAR');
        }
        const thisClientData: any = events.find((e) => e.empresa.nomeFantasia === thisClient);
        setAllData({
            ...allData,
            empresa: {
                agencia: thisClientData.empresa.agencia,
                conta: thisClientData.empresa.conta,
                banco: thisClientData.empresa.banco,
                cnpj: thisClientData.empresa.cnpj,
                nomeFantasia: thisClientData.empresa.nomeFantasia
            },
            dadosDoEvento: {
                cliente: '',
                descricaoEvento: '',
                emailDoContato: thisClientData.dadosDoEvento.emailDoContato,
                nEvento: '',
                status: '',
                tipoEvento: '',
                nomeEvento: '',
                nomeDoContato: thisClientData.dadosDoEvento.nomeDoContato,
                telefoneDoContato: thisClientData.dadosDoEvento.telefoneDoContato,
                responsavel: ''
            }
        });
        setSelectedClient(thisClient);
    };
    // Função para alterar o estado do filtro de tipo de evento
    const handleEventTypeChange = (event: any) => {
        const thisEventType = event.target.value;
        setSelectedEventType(thisEventType);
    };

    const handleChangeAllData = (event: any, name: string, category: string) => {
        setAllData((prevData: any) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [name]: event.target.value
            }
        }));
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={`Selecionar Cliente`}>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 250 }}>
                            <InputLabel id="status-filter-label">Nome / Razão Social</InputLabel>
                            <Select
                                labelId="status-filter-label"
                                id="status-filter"
                                value={selectedClient}
                                label="Filtrar por Situação"
                                onChange={handleClientChange}
                            >
                                <MenuItem value="SELECIONAR">SELECIONAR</MenuItem>
                                {events.map((e, i) => {
                                    return (
                                        <MenuItem key={i} value={e?.empresa?.nomeFantasia}>
                                            <>{e?.empresa?.nomeFantasia}</>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </SubCard>
            </Grid>
            {selectedClient !== 'SELECIONAR' ? (
                <>
                    <Grid item xs={12}>
                        <SubCard title={`Dados do Cliente`}>
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
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'left',
                                                                flexDirection: 'column',
                                                                minWidth: '100%'
                                                            }}
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
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'left',
                                                                flexDirection: 'column',
                                                                minWidth: '100%'
                                                            }}
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
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'left',
                                                                flexDirection: 'column',
                                                                minWidth: '100%'
                                                            }}
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
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'left',
                                                                flexDirection: 'column',
                                                                minWidth: '100%'
                                                            }}
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
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'left',
                                                                flexDirection: 'column',
                                                                minWidth: '100%'
                                                            }}
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
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title={`Dados do Evento`}>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Dados do Evento</Typography>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
                                                    >
                                                        <FormControl sx={{ minWidth: 250 }}>
                                                            <InputLabel id="status-filter-label">Tipo do Evento</InputLabel>
                                                            <Select
                                                                labelId="status-filter-label"
                                                                id="status-filter"
                                                                value={eventType}
                                                                label="Filtrar por Situação"
                                                                onChange={handleEventTypeChange}
                                                            >
                                                                <MenuItem value="SELECIONAR">SELECIONAR</MenuItem>
                                                                {eventTypeList.map((e, i) => {
                                                                    return (
                                                                        <MenuItem key={i} value={e}>
                                                                            <>{e}</>
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
                                                    >
                                                        <Typography variant="subtitle1">Data de Vencimento:</Typography>
                                                        <InputMask
                                                            mask="99/99/9999"
                                                            value={allData?.infoAdministrativas?.dataVencimento}
                                                            onChange={(e) =>
                                                                handleChangeAllData(e, 'dataVencimento', 'infoAdministrativas')
                                                            }
                                                        >
                                                            {/*@ts-ignore */}
                                                            {(inputProps) => (
                                                                <TextField {...inputProps} fullWidth placeholder="dd/mm/aaaa" />
                                                            )}
                                                        </InputMask>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
                                                    >
                                                        <Typography variant="subtitle1">Data de Pagamento:</Typography>
                                                        <InputMask
                                                            mask="99/99/9999"
                                                            value={allData?.infoAdministrativas?.dataPagamento}
                                                            onChange={(e) => handleChangeAllData(e, 'dataPagamento', 'infoAdministrativas')}
                                                        >
                                                            {/*@ts-ignore */}
                                                            {(inputProps) => (
                                                                <TextField {...inputProps} fullWidth placeholder="dd/mm/aaaa" />
                                                            )}
                                                        </InputMask>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
                                                    >
                                                        <Typography variant="subtitle1">Forma de Pagamento:</Typography>
                                                        <TextField
                                                            value={allData?.infoAdministrativas?.formaDePagamento}
                                                            onChange={(e) =>
                                                                handleChangeAllData(e, 'formaDePagamento', 'infoAdministrativas')
                                                            }
                                                        />
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'left',
                                                            flexDirection: 'column',
                                                            minWidth: '100%'
                                                        }}
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
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <ItemsTable initialItems={allData?.pacote && allData?.pacote?.length ? allData.pacote : []} details={false} />
                    </Grid>
                </>
            ) : (
                <></>
            )}
        </Grid>
    );
};

export default ENewDetails;
