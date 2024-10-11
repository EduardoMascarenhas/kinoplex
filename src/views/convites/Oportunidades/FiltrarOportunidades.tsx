import * as React from 'react';

// material-ui
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

// assets
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';

// types
import { KeyedObject } from 'types';
import Button from '@mui/material/Button';
import { Oportunidade } from 'types/oportunidade';

interface Props {
    rows: Oportunidade[];
    setRows: (rows: Oportunidade[]) => void;
}

// ==============================|| INVOICE LIST - FILTER ||============================== //

const FiltrarOportunidades = ({ rows, setRows }: Props) => {
    const [search, setSearch] = React.useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows?.filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['customer_name', 'date', 'email', 'due_date', 'invoice_id', 'quantity', 'status'];

                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(rows);
        }
    };

    const handleCriarOportunidade = () => {
        window.location.href = "/convites/criar-oportunidades";
    }

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    )
                }}
                onChange={handleSearch}
                placeholder="Buscar oportunidade"
                value={search}
                size="small"
                sx={{ width: { xs: 1, sm: 'auto' } }}
            />
            <Stack direction="row" alignItems="center" spacing={1.25}>
                <Button sx={{textTransform: 'initial'}} variant="contained" onClick={() => handleCriarOportunidade()} size="medium">
                    <AddIcon fontSize="small" />  Venda de Convite ou Venda de Evento
                </Button>
            </Stack>
        </Stack>
    );
};

export default FiltrarOportunidades;
