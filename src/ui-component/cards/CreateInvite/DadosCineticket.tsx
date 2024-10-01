import React, { useState, useEffect } from 'react';
// material-ui
import { Grid, FormControlLabel, Checkbox, TextField, InputAdornment, Box, Stack } from '@mui/material';
export interface AllDataType {
    erpIntegrate?: boolean;
    allowMultipleChanges?: boolean;
    maximumNumberOfChanges?: number;
    changesOnlySameSession?: boolean;
    nameDescription?: string;
    abbreviation?: string;
    ticketNumber?: string;
    price?: number;
    priceProducts?: number;
    priceConvenience?: number;
    minimumStock?: number;
    batchWeight?: number;
    batchWeightKg?: number;
    printValue?: boolean;
}

const DadosCineticket = ({ categoria }: { categoria: string }) => {
    const [allData, setAllData] = useState<AllDataType>({
        erpIntegrate: false,
        allowMultipleChanges: false,
        maximumNumberOfChanges: 1,
        changesOnlySameSession: false,
        nameDescription: '',
        abbreviation: '',
        ticketNumber: '',
        price: 0,
        priceProducts: 0,
        priceConvenience: 0,
        minimumStock: 1,
        batchWeight: 0,
        batchWeightKg: 0,
        printValue: false
    });
    const handleCheckboxPrintValue = (event: any) => {
        setAllData({ ...allData, printValue: event.target.checked });
    };
    const handleChangeData = (event: any, name: string) => {
        if (name === 'nameDescription') {
            setAllData({ ...allData, nameDescription: event.target.value });
        }
        if (name === 'abbreviation') {
            setAllData({ ...allData, abbreviation: event.target.value });
        }
        if (name === 'ticketNumber') {
            setAllData({ ...allData, ticketNumber: event.target.value });
        }
        if (name === 'erpIntegrate') {
            setAllData({ ...allData, erpIntegrate: event.target.checked });
        }
        if (name === 'allowMultipleChanges') {
            setAllData({ ...allData, allowMultipleChanges: event.target.checked });
        }
        if (name === 'changesOnlySameSession') {
            setAllData({ ...allData, changesOnlySameSession: event.target.checked });
        }
        if (name === 'price') {
            // Formatar para 2 casas decimais
            let inputValue = event.target.value;

            // Formatando com duas casas decimais
            const formattedValue = parseFloat(inputValue).toFixed(2);

            // Atualiza o estado
            if (!isNaN(Number(formattedValue))) {
                setAllData({ ...allData, price: +formattedValue });
            }
        }
        if (name === 'priceProducts') {
            // Formatar para 2 casas decimais
            let inputValue = event.target.value;

            // Formatando com duas casas decimais
            const formattedValue = parseFloat(inputValue).toFixed(2);

            // Atualiza o estado
            if (!isNaN(Number(formattedValue))) {
                setAllData({ ...allData, priceProducts: +formattedValue });
            }
        }
        if (name === 'priceConvenience') {
            // Formatar para 2 casas decimais
            let inputValue = event.target.value;

            // Formatando com duas casas decimais
            const formattedValue = parseFloat(inputValue).toFixed(2);

            // Atualiza o estado
            if (!isNaN(Number(formattedValue))) {
                setAllData({ ...allData, priceConvenience: +formattedValue });
            }
        }
        if (name === 'minimumStock') {
            const newValue = event.target.value;
            // Permite apenas números inteiros
            const intValue = newValue === '' ? '' : parseInt(newValue, 10);
            setAllData({ ...allData, minimumStock: +intValue });
        }
        if (name === 'maximumNumberOfChanges') {
            const newValue = event.target.value;
            // Permite apenas números inteiros
            const intValue = newValue === '' ? '' : parseInt(newValue, 10);
            setAllData({ ...allData, maximumNumberOfChanges: +intValue });
        }
        if (name === 'batchWeight') {
            // Formatar para 2 casas decimais
            let inputValue = event.target.value;

            // Formatando com duas casas decimais
            const formattedValue = parseFloat(inputValue).toFixed(2);

            // Atualiza o estado
            if (!isNaN(Number(formattedValue))) {
                setAllData({ ...allData, batchWeight: +formattedValue });
            }
        }
        if (name === 'batchWeightKg') {
            // Formatar para 2 casas decimais
            let inputValue = event.target.value;

            // Formatando com duas casas decimais
            const formattedValue = parseFloat(inputValue).toFixed(2);
            if (!isNaN(Number(formattedValue))) {
                setAllData({ ...allData, batchWeightKg: +formattedValue });
            }
        }
    };

    useEffect(() => {
        setAllData({
            erpIntegrate: false,
            allowMultipleChanges: false,
            maximumNumberOfChanges: 1,
            changesOnlySameSession: false,
            nameDescription: '',
            abbreviation: '',
            ticketNumber: '',
            price: 0,
            priceProducts: 0,
            priceConvenience: 0,
            minimumStock: 1,
            batchWeight: 0,
            batchWeightKg: 0,
            printValue: false
        });
    }, [categoria]);
    return (
        <Grid container spacing={2}>
            {/*
            <Grid item xs={12} >
                CATEGORIA SELECIONADA: {categoria}
                <br />
                JSON:{' '}
                {`{
                erpIntegrate: ${allData.erpIntegrate},
                allowMultipleChanges: ${allData.allowMultipleChanges},
                maximumNumberOfChanges: ${allData.maximumNumberOfChanges},
                changesOnlySameSession: ${allData.changesOnlySameSession},
                nameDescription: ${allData.nameDescription},
                abbreviation: ${allData.abbreviation},
                ticketNumber: ${allData.ticketNumber},
                price: ${allData.price},
                priceProducts: ${allData.priceProducts},
                priceConvenience: ${allData.priceConvenience},
                minimumStock: ${allData.minimumStock},
                batchWeight: ${allData.batchWeight},
                batchWeightKg: ${allData.batchWeightKg},
                printValue: ${allData.printValue}
                }`}
            </Grid>
            */}

            {categoria === 'CINETICKET_ELETRONICO' ? (
                <>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={allData.allowMultipleChanges}
                                        onChange={(e) => handleChangeData(e, 'allowMultipleChanges')}
                                        color="primary"
                                    />
                                }
                                label="Permite múltiplas trocas"
                            />
                        </Stack>
                    </Grid>
                    {allData.allowMultipleChanges ? (
                        <>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex' }}>
                                        <h4>Quantidade Máxima de Trocas</h4>
                                    </Box>
                                    <TextField
                                        id="minimum-stock"
                                        label="Quantidade Máxima de Trocas"
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                        onChange={(e) => handleChangeData(e, 'maximumNumberOfChanges')}
                                        value={allData.maximumNumberOfChanges}
                                        type="number"
                                        inputProps={{
                                            step: 1,
                                            min: 1
                                        }}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={3}>
                                <Stack spacing={1}>
                                    <Box sx={{ display: 'flex' }}>
                                        <h4>Restringir trocas somente na mesma sessão</h4>
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={allData.changesOnlySameSession}
                                                onChange={(e) => handleChangeData(e, 'changesOnlySameSession')}
                                                color="primary"
                                            />
                                        }
                                        label="Restringir"
                                    />
                                </Stack>
                            </Grid>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}
            <Grid item xs={12}>
                <Stack spacing={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allData.erpIntegrate}
                                onChange={(e) => handleChangeData(e, 'erpIntegrate')}
                                color="primary"
                            />
                        }
                        label="Integrar com ERP somente após o resgate"
                    />
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Nome / Descrição</h4>
                    </Box>
                    <TextField
                        id="name-description"
                        label="Nome / Descrição"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'nameDescription')}
                        value={allData.nameDescription}
                    />
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Abreviatura</h4>
                    </Box>
                    <TextField
                        id="abbreviation"
                        label="Abreviatura"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'abbreviation')}
                        value={allData.abbreviation}
                    />
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={1}>
                    <Box sx={{ display: 'flex' }}>
                        <h4>Número do Ingresso (ToTVS)</h4>
                    </Box>
                    <TextField
                        id="ticket-number"
                        label="Número do Ingresso (TOTVS)"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChangeData(e, 'ticketNumber')}
                        value={allData.ticketNumber}
                    />
                </Stack>
            </Grid>
            {categoria === 'CINETICKET' ||
            categoria === 'CINETICKET_COMBO' ||
            categoria === 'CINETICKET_BOMBONIERE' ||
            categoria === 'CONVITE_CORTESIA' ? (
                <>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Estoque Mínimo</h4>
                            </Box>
                            <TextField
                                id="minimum-stock"
                                label="Estoque Mínimo"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => handleChangeData(e, 'minimumStock')}
                                value={allData.minimumStock}
                                type="number"
                                inputProps={{
                                    step: 1,
                                    min: 1
                                }}
                            />
                        </Stack>
                    </Grid>
                </>
            ) : (
                <></>
            )}

            {categoria === 'CINETICKET' ||
            categoria === 'CINETICKET_COMBO' ||
            categoria === 'CINETICKET_ELETRONICO' ||
            categoria === 'CINETICKET_COMBO_ELETRONICO' ? (
                <>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Preço de Venda do Ingresso</h4>
                            </Box>
                            <TextField
                                id="price"
                                label="Preço de Venda do Ingresso"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => handleChangeData(e, 'price')}
                                value={allData.price}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                }}
                                type="number"
                            />
                        </Stack>
                    </Grid>
                </>
            ) : (
                <></>
            )}
            {categoria === 'CINETICKET_ELETRONICO' ||
            categoria === 'CINETICKET_COMBO_ELETRONICO' ||
            categoria === 'CONVITE_CORTESIA_ELETRONICO' ? (
                <>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Preço da Conveniência</h4>
                            </Box>
                            <TextField
                                id="price"
                                label="Preço da Conveniência"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => handleChangeData(e, 'priceConvenience')}
                                value={allData.priceConvenience}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                }}
                                type="number"
                            />
                        </Stack>
                    </Grid>
                </>
            ) : (
                <></>
            )}
            {categoria === 'CINETICKET_COMBO' ||
            categoria === 'CINETICKET_COMBO_ELETRONICO' ||
            categoria === 'CINETICKET_BOMBONIERE' ||
            categoria === 'CINETICKET_BOMBONIERE_ELETRONICO' ? (
                <>
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex' }}>
                                <h4>Preço de Venda dos Produtos</h4>
                            </Box>
                            <TextField
                                id="price"
                                label="Preço de Venda dos Produtos"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => handleChangeData(e, 'priceProducts')}
                                value={allData.priceProducts}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                }}
                                type="number"
                            />
                        </Stack>
                    </Grid>
                </>
            ) : (
                <></>
            )}

            <Grid item xs={12}>
                <Stack spacing={1}>
                    <FormControlLabel
                        control={<Checkbox checked={allData.printValue} onChange={handleCheckboxPrintValue} color="primary" />}
                        label="Imprimir o valor no cupom"
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default DadosCineticket;
