import { useEffect, useState } from 'react';

// material-ui
import { Autocomplete, Button, ButtonGroup, FormControl, Grid, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';

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

function SelectItemImpresso({ handleAddItem }: Props) {
    const [convites, setConvites] = useState<ConviteImpresso[]>([]);
    const [selectedItem, setSelectedItem] = useState<ConviteEletronico & ConviteImpresso | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [errors, setErrors] = useState({ quantityError: '' });
    const [conviteType, setConviteType] = useState<'impresso' | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuItemClick = (type: 'impresso') => {
        setConviteType(type);
        setAnchorEl(null); // Fechar o menu
    };

    const convitesImpressos: ConviteImpresso[] = [
        {
            id: 0,
            lote: '20/2023',
            serie: '01',
            numeracao: '01 a 2000',
            descricao: 'ABCD01',
            disponibilidade: 500,
            preco_unitario: 18,
            tipo: 'impresso'
        },
        {
            id: 1,
            lote: '35/2024',
            serie: '02',
            numeracao: '2001 a 4000',
            descricao: 'FGHI02',
            disponibilidade: 1800,
            preco_unitario: 22,
            tipo: 'impresso'
        },
        {
            id: 2,
            lote: '32/2022',
            serie: '03',
            numeracao: '4001 a 6500',
            descricao: 'JKLMN15',
            disponibilidade: 1900,
            preco_unitario: 21,
            tipo: 'impresso'
        },
        {
            id: 3,
            lote: '40/2015',
            serie: '06',
            numeracao: '6501 a 8500',
            descricao: 'OPQR41',
            disponibilidade: 2000,
            preco_unitario: 21,
            tipo: 'impresso'
        },
        {
            id: 4,
            lote: '35/2028',
            serie: '09',
            numeracao: '8501 a 12000',
            descricao: 'STUV40',
            disponibilidade: 3500,
            preco_unitario: 25,
            tipo: 'impresso'
        },
        {
            id: 5,
            lote: '35/2027',
            serie: '08',
            numeracao: '12001 a 15000',
            descricao: 'WYXZ70',
            disponibilidade: 1000,
            preco_unitario: 27,
            tipo: 'impresso'
        },
    ];

    useEffect(() => {
        if (conviteType === 'impresso') {
            setConvites(convitesImpressos);
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

    const handleAddConviteItem = (event: any, value: ConviteEletronico & ConviteImpresso | null) => {
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
                    <Grid item xs={12} md={5}>
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
                            <Button variant="contained" onClick={() => handleMenuItemClick('impresso')} startIcon={<AddIcon />}>
                                Adicionar convite
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} display="flex" direction="row" alignItems="center" justifyContent="flex-start">
                        <Stack direction="row" sx={{ marginTop: '15px' }}>
                            <Button disabled={!selectedItem?.id || !selectedQuantity} variant="contained" onClick={handleOnAddItem} startIcon={<AddIcon />}>
                                Adicionar Convite
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default SelectItemImpresso;
