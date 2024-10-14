import { useEffect, useState } from 'react';

// material-ui
import { Autocomplete, Button, FormControl, Grid, Stack, TextField, Typography } from '@mui/material';

// assets
import AddIcon from '@mui/icons-material/Add';

// project imports
import { gridSpacing } from 'store/constant';
import InputLabel from 'ui-component/extended/Form/InputLabel';

// types
import { styled } from '@mui/material/styles';
import { AddConvite, ConviteEletronico, ConviteImpresso } from 'types/convite';

interface Props {
    handleAddItem: (item: AddConvite) => void;
    setAddItemClicked: (item: boolean) => void;
}

const TypographyConvite = styled(Typography)({
    minHeight: '51px',
    color: '#121926',
    fontWeight: '500',
    fontSize: '14px',
    backgroundColor: '#eff4f9',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '0 12px'
});

function SelectItemEletronico({ handleAddItem }: Props) {
    const [convites, setConvites] = useState<ConviteEletronico[]>([]);
    const [selectedItem, setSelectedItem] = useState<ConviteEletronico & ConviteImpresso | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [errors, setErrors] = useState({ quantityError: '' });
    const [conviteType, setConviteType] = useState<'eletronico' | null>(null);

    const handleMenuItemClick = (type: 'eletronico') => {
        setConviteType(type);
    };

    const convitesEletronicos: ConviteEletronico[] = [
        { id: 1, descricao: 'CDA77', preco_unitario: 18, tipo: 'eletronico' },
        { id: 2, descricao: 'B3021F', preco_unitario: 25, tipo: 'eletronico' },
        { id: 3, descricao: 'ECOFA8', preco_unitario: 26, tipo: 'eletronico' },
        { id: 4, descricao: '240319U', preco_unitario: 32, tipo: 'eletronico' },
        { id: 5, descricao: 'JUSC20', preco_unitario: 30, tipo: 'eletronico' },
        { id: 6, descricao: '11258P', preco_unitario: 24, tipo: 'eletronico' },
    ];

    useEffect(() => {
        if (conviteType === 'eletronico') {
            setConvites(convitesEletronicos);
        }
    }, [conviteType]);

    useEffect(() => {
        setSelectedItem(null);
        setUnitPrice(0);
        setAmount(0);
    }, [conviteType]);

    useEffect(() => {
        setAmount(unitPrice * selectedQuantity);
    }, [selectedQuantity, unitPrice]);

    const handleAddConviteItem = (event: any, value: ConviteEletronico | null) => {
        if (value) {
            setSelectedItem(value);
            setUnitPrice(value.preco_unitario as number);
        } else {
            setSelectedItem(null);
            setUnitPrice(0);
        }
    };

    const handleQuantityChange = (event: any) => {
        const quantity = Number(event.target.value);
        if (quantity < 0) {
            setErrors({ ...errors, quantityError: 'Valores negativos não são permitidos' });
        } else if (quantity === 0) {
            setErrors({ ...errors, quantityError: 'Quantidade não pode ser zero' });
        } else {
            setSelectedQuantity(quantity);
            setErrors({ ...errors, quantityError: '' });
        }
    };

    const handlePriceChange = (event: any) => {
        const value = event.target.value.replace(/\D/g, '');
        const newPrice = parseFloat(value) / 100;
        setUnitPrice(isNaN(newPrice) ? 0 : newPrice);
    };

    const handleOnAddItem = () => {
        if (selectedItem) {
            const data = {
                ...selectedItem,
                quantidade: selectedQuantity,
                preco_unitario: unitPrice,
                quantiaTotal: amount
            };
            handleAddItem(data as AddConvite);

            // Resetar os campos após adicionar o convite
            setSelectedItem(null);
            setSelectedQuantity(1);
            setUnitPrice(0);
            setAmount(0);
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <>
            {conviteType !== null ? (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={5} >
                        <Stack sx={{ height: '75px', paddingTop: '15px' }}>
                            <FormControl>
                                <Autocomplete
                                    options={convites}
                                    getOptionLabel={(option) => option.descricao}
                                    value={selectedItem}
                                    onChange={handleAddConviteItem}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Selecione o Convite" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack sx={{ height: '75px', paddingTop: '15px' }}>
                            <TextField
                                fullWidth
                                type="number"
                                name="quantity"
                                value={selectedQuantity}
                                onChange={handleQuantityChange}
                                error={Boolean(errors.quantityError)}
                                helperText={errors.quantityError}
                                disabled={!selectedItem?.id}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Stack sx={{ height: '75px', paddingTop: '15px' }}>
                            <TextField
                                fullWidth
                                name="unitPrice"
                                value={formatCurrency(unitPrice)}
                                onChange={handlePriceChange}
                                disabled={!selectedItem?.id}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Stack sx={{ height: '75px', paddingTop: '15px' }}>
                            <TypographyConvite variant='body1'>{formatCurrency(amount)}</TypographyConvite>
                        </Stack>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Stack alignItems='center' justifyContent='center' sx={{ height: '75px', backgroundColor: '#f8fafc', border: '2px dashed #dddddd' }}>
                            <InputLabel sx={{ color: 'grey.400', fontWeight: '600', fontSize: '1.4em', textTransform: 'uppercase', margin: '0' }}>Nenhum convite encontrado...</InputLabel>
                        </Stack>
                    </Grid>
                </Grid>
            )}

            {conviteType === null ? (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} display="flex" direction="row" alignItems="center" justifyContent="flex-start">
                        <Stack direction="row" sx={{ marginTop: '15px' }}>
                            <Button variant="contained" onClick={() => handleMenuItemClick('eletronico')} startIcon={<AddIcon />}>
                                Adicionar convite
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} display="flex" direction="row" alignItems="center" justifyContent="flex-start">
                        <Stack direction="row" sx={{ marginTop: '15px' }}>
                            <Button disabled={!selectedItem?.id || !selectedQuantity} variant="outlined" onClick={handleOnAddItem} startIcon={<AddIcon />}>
                                Adicionar Convite
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default SelectItemEletronico;
