import * as React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormControl';

// assets
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import AddIcon from '@mui/icons-material/AddTwoTone';

// types
import { KeyedObject } from 'types';
import { Invoice } from 'types/invoice';
import FormControl from '@mui/material/FormControl';

interface Props {
    rows: Invoice[];
    setRows: (rows: Invoice[]) => void;
}

// ==============================|| INVOICE LIST - FILTER ||============================== //

const FiltroVendas = ({ rows, setRows }: Props) => {
    const [search, setSearch] = React.useState<string>('');
    const [selectedStatus, setSelectedStatus] = React.useState<string>('Todas');

    const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = rows?.filter((row: KeyedObject) => {
                let matches = true;

                const properties = ['customer_name', 'date', 'email', 'cinema', 'invoice_id', 'quantity', 'status'];

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

    const handleStatusFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.value;
        setSelectedStatus(status);

        const filteredRows = rows?.filter((row: KeyedObject) => {
            switch (status) {
                case 'Confirmadas/Pagas':
                    return row.status === 'confirmada' || row.status === 'paga';
                case 'Aguardando aprovação':
                    return row.status === 'aguardando';
                case 'Sem validação de e-mail':
                    return row.status === 'sem_validacao_email';
                case 'Sem confirmação de pagamento':
                    return row.status === 'sem_confirmacao_pagamento';
                case 'Canceladas':
                    return row.status === 'cancelada';
                case 'Separadas':
                    return row.status === 'separada';
                case 'Não Separadas':
                    return row.status === 'nao_separada';
                case 'Não confirmadas':
                    return row.status === 'nao_confirmada';
                default:
                    return true; // 'Todas' retorna todos os registros
            }
        });
        setRows(filteredRows);
    };

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <TextField
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    )
                }}
                onChange={handleSearch}
                placeholder="Buscar venda"
                value={search}
                size="small"
                sx={{ width: { xs: 1, sm: 'auto' } }}
            />
            <Stack direction="row" alignItems="flex-start" spacing={1}>
                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="status"
                        name="status-filter"
                        value={selectedStatus}
                        onChange={handleStatusFilter}
                    >
                        <FormControlLabel value="Todas" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Todas" />
                        <FormControlLabel value="Confirmadas/Pagas" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Confirmadas/Pagas" />
                        <FormControlLabel value="Aguardando aprovação" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Aguardando aprovação" />
                        <FormControlLabel value="Sem validação de e-mail" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Sem validação de e-mail" />
                        <FormControlLabel value="Sem confirmação de pagamento" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Sem confirmação de pagamento" />
                    </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                    <RadioGroup
                        aria-label="status"
                        name="status-filter"
                        value={selectedStatus}
                        onChange={handleStatusFilter}
                    >
                        <FormControlLabel value="Canceladas" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Canceladas" />
                        <FormControlLabel value="Separadas" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Separadas" />
                        <FormControlLabel value="Não Separadas" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Não Separadas" />
                        <FormControlLabel value="Não confirmadas" control={<Radio sx={{pb: '2px', pt: '2px'}} />} label="Não confirmadas" />
                    </RadioGroup>
                </FormControl>
            </Stack>
        </Stack>
    );
};

export default FiltroVendas;
