import React from 'react';

// material-ui
import { Grid, Typography, Box, TextField } from '@mui/material';
// input mask

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
// types
import { ClientDataType } from 'types/client';

const CAddress = ({
    allData,
    handleChangeAllData
}: {
    allData: ClientDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={`Endereço`}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Cep:</Typography>

                                    <TextField value={allData?.endereco?.cep} onChange={(e) => handleChangeAllData(e, 'cep', 'endereco')} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Estado:</Typography>

                                    <TextField
                                        value={allData?.endereco?.estado}
                                        onChange={(e) => handleChangeAllData(e, 'estado', 'endereco')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Cidade:</Typography>

                                    <TextField
                                        value={allData?.endereco?.cidade}
                                        onChange={(e) => handleChangeAllData(e, 'cidade', 'endereco')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Bairro:</Typography>

                                    <TextField
                                        value={allData?.endereco?.bairro}
                                        onChange={(e) => handleChangeAllData(e, 'bairro', 'endereco')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Logradouro:</Typography>

                                    <TextField
                                        value={allData?.endereco?.logradouro}
                                        onChange={(e) => handleChangeAllData(e, 'logradouro', 'endereco')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Número:</Typography>

                                    <TextField
                                        value={allData?.endereco?.numero}
                                        onChange={(e) => handleChangeAllData(e, 'numero', 'endereco')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Complemento:</Typography>

                                    <TextField
                                        value={allData?.endereco?.complemento}
                                        onChange={(e) => handleChangeAllData(e, 'complemento', 'endereco')}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default CAddress;
