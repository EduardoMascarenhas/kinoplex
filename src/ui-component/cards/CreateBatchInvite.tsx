import React, { useState } from 'react';

// material-ui
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Stack,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import DadosOrcamento from './CreateBatchInvite/DadosOrcamento';
import DescricaoObservacao from './CreateBatchInvite/DescricaoObservacao';
import SerieNumeracao from './CreateBatchInvite/SerieNumeracao';
import SerieNumeracoesAnteriores from './CreateBatchInvite/SerieNumeracoesAnteriores';

const rows = [
    { label: 'Cineticket', value: 'CINETICKET' },
    { label: 'Cineticket Combo', value: 'CINETICKET_COMBO' },
    { label: 'Cineticket Eletrônico', value: 'CINETICKET_ELETRONICO' },
    { label: 'Cineticket Combo Eletrônico', value: 'CINETICKET_COMBO_ELETRONICO' },
    { label: 'Cineticket Bomboniere', value: 'CINETICKET_BOMBONIERE' },
    { label: 'Cineticket Bomboniere Eletrônico', value: 'CINETICKET_BOMBONIERE_ELETRONICO' },
    { label: 'Convite Cortesia', value: 'CONVITE_CORTESIA' },
    { label: 'Convite Cortesia Eletrônico', value: 'CONVITE_CORTESIA_ELETRONICO' }
];

export default function CreateBatchInvite() {
    const [nSeries, setNSeries] = React.useState('');

    const handleChangeNSeries = (event: SelectChangeEvent) => {
        setNSeries(event.target.value as string);
    };
    const [category, setCategory] = useState<any>(rows[0]);

    const handleChange = (event: any) => {
        const selectedValue = event.target.value;
        const selectedCategory = rows.find((row) => row.value === selectedValue);
        setCategory(selectedCategory);
    };

    return (
        <Box sx={{ paddingTop: '15px' }}>
            <Accordion expanded sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <h3>Dados do Tipo de Convite</h3>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex-column', gap: '15px', alignItems: 'center' }}>
                    <Grid container>
                        <Grid item xs={3} md={3}>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex' }}>
                                    <h4>Tipo de Convite</h4>
                                </Box>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="category-select-label">Tipo</InputLabel>
                                    <Select labelId="category-select-label" value={category.value} onChange={handleChange}>
                                        {rows.map((row) => (
                                            <MenuItem key={row.value} value={row.value}>
                                                {row.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} md={3}></Grid>
                        <Grid item xs={3} md={3}>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex' }}>
                                    <h4>Nº de Séries</h4>
                                </Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Nº de Série</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={nSeries}
                                        label="Nº Series"
                                        onChange={handleChangeNSeries}
                                        sx={{ maxWidth: '170px' }}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex' }}>
                                    <h4>Tipo</h4>
                                </Box>
                                <FormControl>
                                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                        <FormControlLabel value="female" control={<Radio />} label="Sequencial" />
                                        <FormControlLabel value="male" control={<Radio />} label="Paralelo" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <h3>Séries e Numerações Anteriores</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <SerieNumeracoesAnteriores categoria={category.value} />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <h3>Séries e Numeração</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <SerieNumeracao categoria={category.value} />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <h3>Descrição / Observação</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <DescricaoObservacao categoria={category.value} />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <h3>Dados do Orçamento</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <DadosOrcamento categoria={category.value} />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
