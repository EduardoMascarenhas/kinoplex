import React from 'react';

// material-ui
import { Grid, Typography, Box, TextField, Divider } from '@mui/material';
// input mask

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
// types
import { ClientDataType } from 'types/client';

const CNewDetails = ({
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
            <Grid item xs={12} sx={{ margin: '25px' }}>
                <Divider />
            </Grid>
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
            <Grid item xs={12} sx={{ margin: '25px' }}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <SubCard title={`Empresa`}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Tipo:</Typography>

                                    <TextField value={allData?.empresa?.tipo} onChange={(e) => handleChangeAllData(e, 'tipo', 'empresa')} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Número / Razão Social:</Typography>

                                    <TextField
                                        value={allData?.empresa?.nomeRazaoSocial}
                                        onChange={(e) => handleChangeAllData(e, 'nomeRazaoSocial', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Documento:</Typography>

                                    <TextField
                                        value={allData?.empresa?.documento}
                                        onChange={(e) => handleChangeAllData(e, 'documento', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Apelido:</Typography>

                                    <TextField
                                        value={allData?.empresa?.apelido}
                                        onChange={(e) => handleChangeAllData(e, 'apelido', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Inscrição Municipal:</Typography>

                                    <TextField
                                        value={allData?.empresa?.inscricaoMunicipal}
                                        onChange={(e) => handleChangeAllData(e, 'inscricaoMunicipal', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Inscrição Estadual:</Typography>

                                    <TextField
                                        value={allData?.empresa?.inscricaoEstadual}
                                        onChange={(e) => handleChangeAllData(e, 'inscricaoEstadual', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Suframa:</Typography>

                                    <TextField
                                        value={allData?.empresa?.suframa}
                                        onChange={(e) => handleChangeAllData(e, 'suframa', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Ramo Atividade:</Typography>

                                    <TextField
                                        value={allData?.empresa?.ramoAtividade}
                                        onChange={(e) => handleChangeAllData(e, 'ramoAtividade', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Site Web:</Typography>

                                    <TextField
                                        value={allData?.empresa?.siteWeb}
                                        onChange={(e) => handleChangeAllData(e, 'siteWeb', 'empresa')}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', minWidth: '100%' }}>
                                    <Typography variant="subtitle1">Número Funcionários:</Typography>

                                    <TextField
                                        value={allData?.empresa?.numeroFuncionarios}
                                        onChange={(e) => handleChangeAllData(e, 'numeroFuncionarios', 'empresa')}
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

export default CNewDetails;
