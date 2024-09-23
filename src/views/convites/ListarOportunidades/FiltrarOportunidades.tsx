import * as React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

// assets
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import AddIcon from '@mui/icons-material/AddTwoTone';

// types
import { KeyedObject } from 'types';
import { Invoice } from 'types/invoice';
import Button from '@mui/material/Button';

interface Props {
    rows: Invoice[];
    setRows: (rows: Invoice[]) => void;
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
                placeholder="Buscar Oportunidade"
                value={search}
                size="small"
                sx={{ width: { xs: 1, sm: 'auto' } }}
            />
            <Stack direction="row" alignItems="center" spacing={1.25}>
                <Tooltip title="Copy">
                    <IconButton size="large">
                        <FileCopyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Print">
                    <IconButton size="large">
                        <PrintIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Filter">
                    <IconButton size="large">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Oportunidades">
                    <Button variant="contained" onClick={() => handleCriarOportunidade()} size="small">
                        <AddIcon fontSize="small" /> Oportunidade
                    </Button>
                </Tooltip>
            </Stack>
        </Stack>
    );
};

export default FiltrarOportunidades;
