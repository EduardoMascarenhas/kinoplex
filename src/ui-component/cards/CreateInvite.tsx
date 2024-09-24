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
    FormControlLabel,
    Checkbox,
    Grid,
    Stack
} from '@mui/material';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import DadosCineticket from './CreateInvite/DadosCineticket';
import VendasOnline from './CreateInvite/VendasOnline';
import InfoPerfilUso from './CreateInvite/InfoPerfilUso';

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

export default function CreateInvite() {
    const [category, setCategory] = useState<any>(rows[0]); // Estado inicial com o primeiro item do array
    const [onlineSales, setOnlineSales] = useState<boolean>(false); // Estado inicial com o primeiro item do array

    const handleChange = (event: any) => {
        const selectedValue = event.target.value;
        const selectedCategory = rows.find((row) => row.value === selectedValue); // Encontrar o item correspondente
        setCategory(selectedCategory); // Atualizar o estado com o novo item
    };

    const handleChangeOnlineSales = (event: any) => {
        setOnlineSales(event.target.checked);
    };

    return (
        <Box sx={{ paddingTop: '15px' }}>
            <Accordion expanded sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <h3>Dados do Tipo de Convite</h3>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex-column', gap: '15px', alignItems: 'center' }}>
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex' }}>
                                    <h4>Categoria</h4>
                                </Box>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="category-select-label">Categoria</InputLabel>
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
                        <Grid item xs={12}>
                            <DadosCineticket categoria={category.value} />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {category.value === 'CONVITE_CORTESIA' || category.value === 'CONVITE_CORTESIA_ELETRONICO' ? (
                <></>
            ) : (
                <Accordion expanded={onlineSales} sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                    <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                        <h3>Vendas Online</h3>
                        <FormControlLabel
                            control={<Checkbox checked={onlineSales} onChange={handleChangeOnlineSales} color="primary" />}
                            label="Permitir Vendas Online"
                            sx={{ ml: '15px' }}
                        />
                    </AccordionSummary>

                    <AccordionDetails>
                        <VendasOnline categoria={category.value} />
                    </AccordionDetails>
                </Accordion>
            )}

            <Accordion sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <h3>Informações Sobre o Perfil de Uso</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <InfoPerfilUso categoria={category.value} />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
