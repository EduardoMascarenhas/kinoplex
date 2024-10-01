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

const CContato = ({
    allData,
    handleChangeAllData
}: {
    allData: ClientDataType;
    handleChangeAllData: (event: any, name: string, category: string) => void;
}) => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={`Contatos`}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Nome:</Typography>

                                    <TextField
                                        value={allData?.contatos?.nome}
                                        onChange={(e) => handleChangeAllData(e, 'nome', 'contatos')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Email:</Typography>

                                    <TextField
                                        value={allData?.contatos?.email}
                                        onChange={(e) => handleChangeAllData(e, 'email', 'contatos')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Cargo:</Typography>

                                    <TextField
                                        value={allData?.contatos?.cargo}
                                        onChange={(e) => handleChangeAllData(e, 'cargo', 'contatos')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Telefone:</Typography>

                                    <TextField
                                        value={allData?.contatos?.telefone}
                                        onChange={(e) => handleChangeAllData(e, 'telefone', 'contatos')}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        {/** <Grid item xs={12} sx={{ margin: '25px' }}>
                            <Divider />
                        </Grid>*/}
                    </Grid>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default CContato;
