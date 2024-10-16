import React, { useState, useEffect } from 'react';
// material-ui
import { Grid, TextField, FormControlLabel, Checkbox, Box, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';

export interface AllDataType {
    printName?: string;
}

const DadosOrcamento = ({ categoria }: { categoria: string }) => {
    const [orcamento, setOrcamento] = useState({
        nOrcamento: '',
        dataEntrega: '',
        valor: '',
        grafica: '',
        telefoneDaGrafica: '',
        contato: ''
    });

    const handleChangeOrcamento = (event: any, name: string) => {
        setOrcamento({ ...orcamento, [name]: event.target.value });
    };

    return (
        <Grid container gap={2}>
            <Grid item xs={3}>
                <Box sx={{ display: 'column' }}>
                    <h4>Nº do Orçamento: </h4>
                    <TextField
                        value={orcamento.nOrcamento}
                        onChange={(e: any) => handleChangeOrcamento(e, 'nOrcamento')}
                        variant="outlined"
                    />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ display: 'column' }}>
                    <h4>Data de Entrega: </h4>
                    <TextField
                        value={orcamento.dataEntrega}
                        onChange={(e: any) => handleChangeOrcamento(e, 'dataEntrega')}
                        variant="outlined"
                    />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ display: 'column' }}>
                    <h4>Valor: </h4>
                    <TextField value={orcamento.valor} onChange={(e: any) => handleChangeOrcamento(e, 'valor')} variant="outlined" />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ display: 'column' }}>
                    <h4>Gráfica: </h4>
                    <TextField value={orcamento.grafica} onChange={(e: any) => handleChangeOrcamento(e, 'grafica')} variant="outlined" />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ display: 'column' }}>
                    <h4>Telefone da Gráfica: </h4>
                    <TextField
                        value={orcamento.telefoneDaGrafica}
                        onChange={(e: any) => handleChangeOrcamento(e, 'telefoneDaGrafica')}
                        variant="outlined"
                    />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ display: 'column' }}>
                    <h4>Contato: </h4>
                    <TextField value={orcamento.contato} onChange={(e: any) => handleChangeOrcamento(e, 'contato')} variant="outlined" />
                </Box>
            </Grid>
        </Grid>
    );
};

export default DadosOrcamento;
