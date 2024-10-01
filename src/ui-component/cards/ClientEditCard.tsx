import React from 'react';
// material-ui
import { Grid, Box, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone';
// project import
import EditClient from './EditClient';

export default function ClientEditCard() {
    return (
        <Box sx={{ paddingTop: '15px' }}>
            <Accordion expanded sx={{ flex: 100, mb: '15px', paddingX: '15px' }}>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <h3>Editar Cliente</h3>
                        <Button
                            color="secondary"
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ mr: '15px' }}
                            onClick={() => (window.location.href = `/clientes`)}
                            startIcon={<BackspaceTwoToneIcon />}
                        >
                            Voltar
                        </Button>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex-column', gap: '15px', alignItems: 'center' }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <EditClient />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
