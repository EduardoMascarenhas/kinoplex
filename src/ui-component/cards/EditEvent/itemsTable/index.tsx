import React, { useState, useEffect } from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    IconButton,
    Box,
    TextField,
    TableContainer,
    Tooltip,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import SubCard from 'ui-component/cards/SubCard';
import { ThemeMode } from 'types/config';
import { useTheme } from '@mui/material/styles';

interface Item {
    id: number;
    tipo: string;
    item: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
}

interface ItemsTableProps {
    initialItems: Item[];
    details: boolean;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ initialItems, details }) => {
    const theme = useTheme();

    // Inicializando o pacote como um array vazio
    const [pacote, setPacote] = useState<Item[]>(initialItems || []);

    // Efeito para sincronizar com mudanças no initialItems
    useEffect(() => {
        if (initialItems && initialItems.length > 0) {
            setPacote(initialItems); // Atualiza pacote quando initialItems mudar
        }
    }, [initialItems]);

    const addItem = () => {
        const newItem: Item = {
            id: pacote.length + 1,
            tipo: '',
            item: '',
            quantidade: 1,
            valorUnitario: 0,
            valorTotal: 0
        };
        setPacote([...pacote, newItem]);
    };

    const removeItem = (id: number) => {
        setPacote(pacote.filter((item) => item.id !== id));
    };

    const calcularSubtotal = () => {
        return pacote.reduce((acc, item) => acc + item.valorTotal, 0);
    };

    const handleEditItem = (index: number, field: string, value: any) => {
        const updatedPacote = [...pacote];
        updatedPacote[index] = { ...updatedPacote[index], [field]: value };
        updatedPacote[index].valorTotal = updatedPacote[index].quantidade * updatedPacote[index].valorUnitario;
        setPacote(updatedPacote);
    };

    const isLastItemValid = () => {
        if (pacote.length === 0) return true;
        const lastItem = pacote[pacote.length - 1];
        return lastItem.tipo.trim() !== '' && lastItem.item.trim() !== '';
    };

    const subTotal = calcularSubtotal();
    const total = subTotal;

    return (
        <SubCard title="Pacote" content={false}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nº</TableCell>
                                    <TableCell align="left">Tipo / Item</TableCell>
                                    <TableCell align="center">Quantidade</TableCell>
                                    <TableCell align="center">Valor Unitário</TableCell>
                                    <TableCell align="center">Valor Total</TableCell>
                                    {details ? <></> : <TableCell align="right" sx={{ pr: 3 }} />}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {details ? (
                                    <>
                                        {pacote.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{row.id}</TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        <Tooltip title={`${row.tipo} / ${row.item}`}>
                                                            <Typography variant="body2">{`${row.tipo} / ${row.item}`}</Typography>
                                                        </Tooltip>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title={`${row.quantidade}`}>
                                                        <Typography variant="body2">{`${row.quantidade}`}</Typography>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title={`${row.valorUnitario}`}>
                                                        <Typography variant="body2">{`${row.valorUnitario}`}</Typography>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell align="center">R${row.valorTotal.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {pacote.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{row.id}</TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Tipo"
                                                                value={row.tipo}
                                                                onChange={(e) => handleEditItem(index, 'tipo', e.target.value)}
                                                            >
                                                                <MenuItem value={'Tipo_1'}>Tipo 1</MenuItem>
                                                                <MenuItem value={'Tipo_2'}>Tipo 2</MenuItem>
                                                                <MenuItem value={'Tipo_3'}>Tipo 3</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Item"
                                                                value={row.item}
                                                                onChange={(e) => handleEditItem(index, 'item', e.target.value)}
                                                            >
                                                                <MenuItem value={'Item_1'}>Item 1</MenuItem>
                                                                <MenuItem value={'Item_2'}>Item 2</MenuItem>
                                                                <MenuItem value={'Item_3'}>Item 3</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        type="number"
                                                        value={row.quantidade}
                                                        onChange={(e) => handleEditItem(index, 'quantidade', +e.target.value)}
                                                        label="Quantidade"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        type="number"
                                                        value={row.valorUnitario}
                                                        onChange={(e) => handleEditItem(index, 'valorUnitario', +e.target.value)}
                                                        label="Valor Unitário"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">R${row.valorTotal.toFixed(2)}</TableCell>
                                                <TableCell align="right">
                                                    <IconButton color="primary" size="large" onClick={() => removeItem(row.id)}>
                                                        <DeleteTwoToneIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Botão para adicionar item */}
                {details ? (
                    <></>
                ) : (
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Button color="primary" size="large" onClick={addItem} disabled={!isLastItemValid()}>
                                Adicionar Item
                            </Button>
                        </Grid>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <SubCard sx={{ mx: 3, mb: 3, bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'primary.light' }}>
                        <Grid container justifyContent="flex-end" spacing={3}>
                            <Grid item sm={6} md={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography align="right" color="primary" variant="subtitle1">
                                            Total :
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography align="right" color="primary" variant="subtitle1">
                                            R$ {total.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default ItemsTable;
