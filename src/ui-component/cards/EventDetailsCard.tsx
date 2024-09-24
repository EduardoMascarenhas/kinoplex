import React from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import {
    Stack,
    Grid,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    InputAdornment
} from '@mui/material';
import { Draw } from '@mui/icons-material';
// project import
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import EventDetailsById from './EventDetails';

export default function EventDetailsCard() {
    // Captura o id da URL
    const { id } = useParams();
    return (
        <Box sx={{ paddingTop: '15px' }}>
            <Accordion expanded sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <h3>(DETALHES) - Dados da Empresa Sediadora do Evento - {id}</h3>
                        <Button
                            color="secondary"
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ mr: '15px' }}
                            onClick={() => (window.location.href = `/evento/editar/${id}`)}
                            startIcon={<Draw />}
                        >
                            Editar
                        </Button>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex-column', gap: '15px', alignItems: 'center' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <EventDetailsById />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
