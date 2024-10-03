import React, { useState } from 'react';

// material-ui
import {
    Button,
    Grid,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel
} from '@mui/material';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';

// project imports
import { gridSpacing } from 'store/constant';

// types
import SubCard from '../SubCard';

const ISeparationDetails = () => {
    const [tiposRetirada, setTiposRetirada] = useState('SELECIONAR');
    const retiradaTypes = ['NA_PORTA', 'ONLINE'];
    // Função para alterar o estado do filtro de tipo de evento
    const handleRetiradaType = (event: any) => {
        const thisRetiradaType = event.target.value;
        setTiposRetirada(thisRetiradaType);
    };
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Venda</Typography>
                            <br />
                            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                                <Grid item xs={4} sx={{ alignItems: 'left' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Status: </Typography>

                                        <Typography variant="body2">VENDIDO</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4} sx={{ alignItems: 'left' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Retirada: </Typography>

                                        <FormControl sx={{ minWidth: 250 }}>
                                            <InputLabel id="status-filter-label">Selecionar</InputLabel>
                                            <Select
                                                labelId="status-filter-label"
                                                id="status-filter"
                                                value={tiposRetirada}
                                                label="Filtrar por Situação"
                                                onChange={handleRetiradaType}
                                            >
                                                <MenuItem value="SELECIONAR">SELECIONAR</MenuItem>
                                                {retiradaTypes.map((r, i) => {
                                                    return (
                                                        <MenuItem key={i} value={r}>
                                                            <>{r}</>
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Convite</Typography>
                            <br />
                            <Grid container spacing={3} sx={{ alignItems: 'center' }}>
                                <Grid item xs={3} sx={{ alignItems: 'left' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Lote/Série: </Typography>

                                        <Typography variant="body2">182023-0</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sx={{ alignItems: 'left' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Numeração: </Typography>
                                        <Typography variant="body2">400 à 500</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sx={{ alignItems: 'left' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Quantidade: </Typography>
                                        <Typography variant="body2">100</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3} sx={{ alignItems: 'left' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column' }}>
                                        <Typography variant="subtitle1">Validade: </Typography>
                                        <Typography variant="body2">
                                            02/10/2024 - 1 Dia <a href="/convites">Alterar</a>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Status</Typography>
                            <br />
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Marcar esta venda como separada." />
                                <FormControlLabel control={<Checkbox />} label="Marcar esta venda como entregue" />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mr: '15px' }}
                    onClick={() => window.location.reload()}
                    startIcon={<SaveTwoToneIcon />}
                >
                    Salvar
                </Button>
            </Grid>
        </Grid>
    );
};

export default ISeparationDetails;
