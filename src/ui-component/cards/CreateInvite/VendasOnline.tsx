import React, { useState } from 'react';
// material-ui
import { Grid, TextField, FormControlLabel, Checkbox, Box } from '@mui/material';

export interface AllDataType {
    storeDescription?: string;
    minAmount?: number;
    multiplesOfQuantity?: number;
    imageUrl?: string;
    termsAndConditions?: string;
    featuredOnStore?: boolean;
}

const VendasOnline = ({ categoria }: { categoria: string }) => {
    const [allData, setAllData] = useState<AllDataType>({
        storeDescription: '',
        minAmount: 0,
        multiplesOfQuantity: 0,
        imageUrl: '',
        termsAndConditions: '',
        featuredOnStore: false
    });

    const handleCheckboxFeaturedOnStore = (event: any) => {
        setAllData({ ...allData, featuredOnStore: event.target.checked });
    };

    const handleChangeData = (event: any, name: string) => {
        if (name === 'storeDescription') {
            setAllData({ ...allData, storeDescription: event.target.value });
        }
        if (name === 'minAmount') {
            const newValue = event.target.value;
            // Permite apenas números inteiros
            const intValue = newValue === '' ? '' : parseInt(newValue, 10);
            setAllData({ ...allData, minAmount: +intValue });
        }
        if (name === 'multiplesOfQuantity') {
            const newValue = event.target.value;
            // Permite apenas números inteiros
            const intValue = newValue === '' ? '' : parseInt(newValue, 10);
            setAllData({ ...allData, multiplesOfQuantity: +intValue });
        }
        if (name === 'imageUrl') {
            setAllData({ ...allData, imageUrl: event.target.value });
        }
        if (name === 'termsAndConditions') {
            setAllData({ ...allData, termsAndConditions: event.target.value });
        }
    };
    return (
        <Grid container sx={{ paddingY: '15px' }}>
            {/*
            <Grid item xs={12} sx={{ mb: '15px', paddingX: '15px' }}>
                JSON:{' '}
                {`{
                storeDescription: ${allData.storeDescription},
                minAmount: ${allData.minAmount},
                multiplesOfQuantity: ${allData.multiplesOfQuantity},
                imageUrl: ${allData.imageUrl},
                termsAndConditions: ${allData.termsAndConditions},
                featuredOnStore: ${allData.featuredOnStore},
                }`}
            </Grid>
            */}

            <Grid xs={12} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item xs={4} sx={{ mb: '15px', paddingX: '15px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Descrição na Loja</h4>
                    </Box>
                    <TextField
                        id="store-description"
                        label="Descrição na Loja"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'storeDescription')}
                        value={allData.storeDescription}
                    />
                </Grid>
                <Grid item xs={4} sx={{ mb: '15px', paddingX: '15px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Estoque Mínimo</h4>
                    </Box>
                    <TextField
                        id="minimum-amount"
                        label="Estoque Mínimo"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'minAmount')}
                        value={allData.minAmount}
                        type="number"
                        inputProps={{
                            step: 1,
                            min: 1
                        }}
                    />
                </Grid>
                <Grid item xs={4} sx={{ mb: '15px', paddingX: '15px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Múltiplos de Quantidade</h4>
                    </Box>
                    <TextField
                        id="multiples-quantity"
                        label="Múltiplos de Quantidade"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'multiplesOfQuantity')}
                        value={allData.multiplesOfQuantity}
                        type="number"
                        inputProps={{
                            step: 1,
                            min: 1
                        }}
                    />
                </Grid>
                <Grid item xs={4} sx={{ mb: '15px', paddingX: '15px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>URL da imagem</h4>
                    </Box>
                    <TextField
                        id="image-url"
                        label="URL da Imagem"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'imageUrl')}
                        value={allData.imageUrl}
                    />
                </Grid>
                <Grid item xs={12} sx={{ mb: '15px', paddingX: '15px' }}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Termos / Condições de Uso</h4>
                    </Box>
                    <TextField
                        id="terms-and-conditions"
                        label="Termos/Condições de Uso"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'termsAndConditions')}
                        value={allData.termsAndConditions}
                        type="text"
                        multiline
                        rows={5}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mb: '15px', paddingX: '15px' }}>
                <FormControlLabel
                    control={<Checkbox checked={allData.featuredOnStore} onChange={handleCheckboxFeaturedOnStore} color="primary" />}
                    label="Esse convite é DESTAQUE na Loja"
                />
            </Grid>
        </Grid>
    );
};

export default VendasOnline;
