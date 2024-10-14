import React, { useState } from 'react';

// material-ui
import { Button, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem, Modal, IconButton } from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

// date picker
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
// project imports
import { gridSpacing } from 'store/constant';

// types
import SubCard from '../SubCard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const ISeparationDetails = () => {
    //openSeparação
    const [openSeparacao, setOpenSeparacao] = React.useState(false);
    const handleOpenSeparacao = () => setOpenSeparacao(true);
    const handleCloseSeparacao = () => setOpenSeparacao(false);
    //openEntrega
    const [openEntrega, setOpenEntrega] = React.useState(false);
    const handleOpenEntrega = () => setOpenEntrega(true);
    const handleCloseEntrega = () => setOpenEntrega(false);

    const [tiposRetirada, setTiposRetirada] = useState('SELECIONAR');
    const [selectedStatus, setSelectedStatus] = useState('VENDIDO');
    const retiradaTypes = ['NA_PORTA', 'ONLINE'];
    const statusList = ['VENDIDO', 'EM_ANALISE', 'AGUARDANDO_PAGAMENTO'];

    // Lista de convites
    const [convites, setConvites] = useState([
        {
            loteSerie: '',
            numeracaoInicio: '',
            numeracaoFim: '',
            quantidade: 0,
            validade: null
        }
    ]);

    // Lista de Lotes/Séries (exemplo)
    const loteSerieList = ['182023-0', '182023-1', '182023-2'];

    // Função para adicionar um novo convite
    const handleAddConvite = () => {
        setConvites([
            ...convites,
            {
                loteSerie: '',
                numeracaoInicio: '',
                numeracaoFim: '',
                quantidade: 0,
                validade: null
            }
        ]);
    };

    // Função para remover um convite
    const handleRemoveConvite = (index: any) => {
        const newConvites = [...convites];
        newConvites.splice(index, 1);
        setConvites(newConvites);
    };

    // Função para lidar com mudanças nos campos dos convites
    const handleConviteChange = (index: any, field: any, value: any) => {
        const newConvites: any = [...convites];
        newConvites[index][field] = value;

        // Se o campo alterado for numeracaoInicio ou numeracaoFim, calcular a quantidade
        if (field === 'numeracaoInicio' || field === 'numeracaoFim') {
            const inicio = parseInt(newConvites[index].numeracaoInicio, 10);
            const fim = parseInt(newConvites[index].numeracaoFim, 10);
            if (!isNaN(inicio) && !isNaN(fim)) {
                newConvites[index].quantidade = fim - inicio;
            } else {
                newConvites[index].quantidade = 0;
            }
        }

        setConvites(newConvites);
    };

    // Função de validação do último item
    const isLastConviteValid = () => {
        const lastConvite = convites[convites.length - 1];
        return (
            lastConvite.loteSerie !== '' &&
            lastConvite.numeracaoInicio !== '' &&
            lastConvite.numeracaoFim !== '' &&
            lastConvite.validade !== null
        );
    };

    return (
        <Box>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Venda</Typography>
                                <br />
                                <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                                    <Grid item xs={4} sx={{ alignItems: 'left' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'left',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Typography variant="subtitle1">Retirada: </Typography>

                                            <FormControl sx={{ minWidth: 250 }}>
                                                <InputLabel id="retirada-type-label">Selecionar</InputLabel>
                                                <Select
                                                    labelId="retirada-type-label"
                                                    id="retirada-type"
                                                    value={tiposRetirada}
                                                    label="Filtrar por Situação"
                                                    onChange={(e) => setTiposRetirada(e.target.value)}
                                                >
                                                    <MenuItem value="SELECIONAR">SELECIONAR</MenuItem>
                                                    {retiradaTypes.map((r, i) => (
                                                        <MenuItem key={i} value={r}>
                                                            {r}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4} sx={{ alignItems: 'left' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'left',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Typography variant="subtitle1">Status: </Typography>

                                            <FormControl sx={{ minWidth: 250 }}>
                                                <InputLabel id="status-filter-label">Selecionar</InputLabel>
                                                <Select
                                                    labelId="status-filter-label"
                                                    id="status-filter"
                                                    value={selectedStatus}
                                                    label="Filtrar por Status"
                                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                                >
                                                    <MenuItem value="SELECIONAR">SELECIONAR</MenuItem>
                                                    {statusList.map((s, i) => (
                                                        <MenuItem key={i} value={s}>
                                                            {s}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                {/* Seção de Convites */}
                <Grid item xs={12}>
                    <SubCard>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Typography variant="h4">Convite</Typography>
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddCircleOutlineIcon />}
                                        onClick={handleAddConvite}
                                        disabled={!isLastConviteValid()} // Botão só habilitado se o último convite for válido
                                    >
                                        Adicionar Item
                                    </Button>
                                </Grid>
                                <br />
                                {convites.map((convite, index) => (
                                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={3}>
                                                <FormControl fullWidth>
                                                    <InputLabel id={`lote-serie-label-${index}`}>Lote/Série</InputLabel>
                                                    <Select
                                                        labelId={`lote-serie-label-${index}`}
                                                        id={`lote-serie-${index}`}
                                                        value={convite.loteSerie}
                                                        label="Lote/Série"
                                                        onChange={(e) => handleConviteChange(index, 'loteSerie', e.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Selecionar</em>
                                                        </MenuItem>
                                                        {loteSerieList.map((ls, i) => (
                                                            <MenuItem key={i} value={ls}>
                                                                {ls}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id={`numeracao-inicio-label-${index}`}>Início</InputLabel>
                                                            <Select
                                                                labelId={`numeracao-inicio-label-${index}`}
                                                                id={`numeracao-inicio-${index}`}
                                                                value={convite.numeracaoInicio}
                                                                label="Início"
                                                                onChange={(e) =>
                                                                    handleConviteChange(index, 'numeracaoInicio', e.target.value)
                                                                }
                                                            >
                                                                <MenuItem value="">
                                                                    <em>Início</em>
                                                                </MenuItem>
                                                                {[400, 500, 600].map((num, i) => (
                                                                    <MenuItem key={i} value={num}>
                                                                        {num}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id={`numeracao-fim-label-${index}`}>Fim</InputLabel>
                                                            <Select
                                                                labelId={`numeracao-fim-label-${index}`}
                                                                id={`numeracao-fim-${index}`}
                                                                value={convite.numeracaoFim}
                                                                label="Fim"
                                                                onChange={(e) => handleConviteChange(index, 'numeracaoFim', e.target.value)}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>Fim</em>
                                                                </MenuItem>
                                                                {[450, 550, 650].map((num, i) => (
                                                                    <MenuItem key={i} value={num}>
                                                                        {num}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                                    <DatePicker
                                                        label="Validade"
                                                        value={convite.validade}
                                                        onChange={(newValue) => handleConviteChange(index, 'validade', newValue)}
                                                        format="DD/MM/YYYY"
                                                    />
                                                </LocalizationProvider>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="body1">Quantidade: {convite.quantidade}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {convites.length > 1 && (
                                                    <IconButton aria-label="remover convite" onClick={() => handleRemoveConvite(index)}>
                                                        <RemoveCircleOutlineIcon />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>

                {/* Botões "Finalizar Entrega" e "Finalizar Separação" */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        color="secondary"
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ mr: '15px' }}
                        onClick={handleOpenEntrega}
                        startIcon={<SaveTwoToneIcon />}
                        disabled
                    >
                        Finalizar Entrega
                    </Button>
                    <Button
                        color="primary"
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ mr: '15px' }}
                        onClick={handleOpenSeparacao}
                        startIcon={<SaveTwoToneIcon />}
                    >
                        Finalizar Separação
                    </Button>
                </Grid>
            </Grid>
            <Modal
                open={openEntrega}
                onClose={handleCloseEntrega}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deseja Realmente Realizar a Enterga?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Esta ação é irreversível!
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openSeparacao}
                onClose={handleCloseSeparacao}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deseja Realmente Realizar a Separação?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Esta ação é irreversível!
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
};

export default ISeparationDetails;
