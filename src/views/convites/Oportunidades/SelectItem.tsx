import { useEffect, useState } from 'react';

// material-ui
import { Autocomplete, Button, ButtonGroup, FormControl, Grid, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';

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

const ButtonGroupKino = styled(ButtonGroup)({
    border: '1px solid #ff7e00'
});

function SelectItem({ handleAddItem, setAddItemClicked }: Props) {
    const [convites, setConvites] = useState<ConviteEletronico[] & ConviteImpresso[]>([]);
    const [selectedItem, setSelectedItem] = useState<ConviteEletronico & ConviteImpresso | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [errors, setErrors] = useState({ quantityError: '' });
    const [conviteType, setConviteType] = useState<'eletronico' | 'impresso' | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (type: 'eletronico' | 'impresso') => {
        setConviteType(type);
        setAnchorEl(null); // Fechar o menu
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const convitesEletronicos: ConviteEletronico[] = [
        { id: 1, descricao: 'Eletrônico A', preco_unitario: 100, tipo: 'eletronico' },
        { id: 2, descricao: 'Eletrônico B', preco_unitario: 500, tipo: 'eletronico' }
    ];

    const convitesImpressos: ConviteImpresso[] = [
        {
            id: 3,
            lote: '20/2023',
            serie: '01',
            numeracao: '5121 a 5250',
            descricao: 'Impresso ABCD',
            disponibilidade: 300,
            preco_unitario: 18,
            tipo: 'impresso'
        },
        {
            id: 4,
            lote: '35/2024',
            serie: '03',
            numeracao: '6001 a 6500',
            descricao: 'Impresso FGHI',
            disponibilidade: 900,
            preco_unitario: 21,
            tipo: 'impresso'
        }
    ];

    useEffect(() => {
        if (conviteType === 'eletronico') {
            setConvites(convitesEletronicos);
        } else {
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
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <>
            {conviteType === 'eletronico' && conviteType != null && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Convites Eletrônicos:</InputLabel>
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
                    {selectedItem && (
                        <>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Quantidade:</InputLabel>
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
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Preço Unitário:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="unitPrice"
                                        value={formatCurrency(unitPrice)}
                                        onChange={handlePriceChange}
                                        disabled={!selectedItem?.id}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Total:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="amount"
                                        value={formatCurrency(amount)}
                                        disabled={!selectedItem?.id}
                                    />
                                </Stack>
                            </Grid>
                        </>
                    )}
                </Grid>
            )}

            {conviteType === 'impresso' && conviteType != null && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Convites Impressos:</InputLabel>
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

                    {selectedItem && (
                        <>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Quantidade:</InputLabel>
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
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Preço Unitário:</InputLabel>
                                    <TextField
                                        fullWidth
                                        name="unitPrice"
                                        value={formatCurrency(unitPrice)}
                                        onChange={handlePriceChange}
                                        disabled={!selectedItem?.id}
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Stack spacing={1}>
                                    <InputLabel sx={{ color: 'grey.500', fontWeight: '400' }}>Total:</InputLabel>
                                    <TypographyConvite variant='body1'>{formatCurrency(amount)}</TypographyConvite>
                                </Stack>
                            </Grid>
                        </>
                    )}
                </Grid>
            )}

            {conviteType === null && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} display="flex" direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <ButtonGroupKino variant="outlined" color="secondary">
                                <Button>
                                    {conviteType === null
                                        ? 'Tipo convite'
                                        : conviteType === 'eletronico'
                                            ? 'Eletrônico'
                                            : 'Impresso'}
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={handleMenuClick}
                                    aria-controls={open ? 'split-button-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="menu"
                                >
                                    ▼
                                </Button>
                                <Menu
                                    id="split-button-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        selected={conviteType === 'eletronico'}
                                        onClick={() => handleMenuItemClick('eletronico')}
                                    >
                                        Convite Eletrônico
                                    </MenuItem>
                                    <MenuItem
                                        selected={conviteType === 'impresso'}
                                        onClick={() => handleMenuItemClick('impresso')}
                                    >
                                        Convite Impresso
                                    </MenuItem>
                                </Menu>
                            </ButtonGroupKino>
                        </Stack>
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} display="flex" direction="row" spacing={1} alignItems="center" justifyContent="flex-end">

                    <Stack direction="row" spacing={1}>
                        <Button color="error" onClick={() => setAddItemClicked(false)}>
                            Cancelar
                        </Button>
                        <Button disabled={!selectedItem?.id || !selectedQuantity} variant="contained" size="small" onClick={handleOnAddItem}>
                            Adicionar Convite
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default SelectItem;
