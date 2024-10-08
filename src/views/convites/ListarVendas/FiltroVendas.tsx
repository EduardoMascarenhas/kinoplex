// material-ui
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// types
import { KeyedObject } from 'types';
import { Invoice } from 'types/invoice';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { styled } from '@mui/material/styles';

// ==============================|| INVOICE LIST - FILTER ||============================== //


interface Props {
    rows: Invoice[];
    setRows: (rows: Invoice[]) => void;
}

// Lista de locais de entrega
const locaisEntrega = [
    { label: '-- Todos --', value: '' },
    { label: '(EC) Escritório Central', value: 'EC' },
    { label: '(2) Kinoplex Bay Market', value: '2' },
    { label: '(3) Kinoplex Goiânia', value: '3' },
    { label: '(4) Kinoplex TopShopping 1 a 3', value: '4' },
    { label: '(5) Kinoplex Shopping Boulevard RJ', value: '5' },
    { label: '(7) Kinoplex North Shopping (Fortaleza)', value: '7' },
    { label: '(8) Kinoplex Patio Brasil', value: '8' },
    { label: '(10) Roxy', value: '10' },
    { label: '(12) Kinoplex Terraço Shopping', value: '12' },
    { label: '(13) Kinoplex ParkShopping', value: '13' },
    { label: '(15) Kinoplex Dom Pedro', value: '15' },
    { label: '(16) Kinoplex Sao Luiz', value: '16' },
    { label: '(17) Kinoplex Tijuca', value: '17' },
    { label: '(18) Kinoplex Itaim', value: '18' },
    { label: '(24) Kinoplex Boulevard', value: '24' },
    { label: '(25) Kinoplex Fashion Mall', value: '25' },
    { label: '(26) Kinoplex Vila Olimpia', value: '26' },
    { label: '(27) Kinoplex West Shopping', value: '27' },
    { label: '(28) Kinoplex Boa Vista', value: '28' },
    { label: '(29) Kinoplex Grande Rio', value: '29' },
    { label: '(30) Kinoplex Shopping Leblon', value: '30' },
    { label: '(31) Kinoplex Maceio', value: '31' },
    { label: '(32) Kinoplex Nova America', value: '32' },
    { label: '(34) CineCarioca Meier', value: '34' },
    { label: '(38) Kinoplex Madureira', value: '38' },
    { label: '(39) Kinoplex Osasco', value: '39' },
    { label: '(40) Kinoplex Amazonas', value: '40' },
    { label: '(41) Kinoplex Avenida', value: '41' },
    { label: '(43) Kinoplex Praia da Costa', value: '43' },
    { label: '(44) Kinoplex Via Parque', value: '44' },
    { label: '(45) Cine Odeon- Centro Cultural LSR', value: '45' },
    { label: '(46) Kinoplex Uberaba', value: '46' },
    { label: '(47) Kinoplex RioSul', value: '47' },
    { label: '(48) Kinoplex Nova Iguaçu', value: '48' },
    { label: '(49) Kinoplex Iguaçu Top', value: '49' },
    { label: '(50) Kinoplex Golden', value: '50' },
    { label: '(51) Kinoplex Parque da Cidade', value: '51' },
    { label: '(52) Kinoplex Leblon Globoplay', value: '52' }
];

// Lista de clientes
const listaClientes = [
    { label: '-- Todos --', value: '' },
    { label: 'Maria Silva', value: '1' },
    { label: 'João Oliveira', value: '2' },
    { label: 'Carlos Souza', value: '3' },
    { label: 'Empresa XYZ Ltda.', value: '4' },
    { label: 'Ana Pereira', value: '5' },
    { label: 'Tech Innovators Inc.', value: '6' },
    { label: 'José Almeida', value: '7' },
    { label: 'Digital Solutions Co.', value: '8' },
    { label: 'Luciana Costa', value: '9' },
    { label: 'Global Ventures S.A.', value: '10' },
    { label: 'Fabiana Rodrigues', value: '11' },
    { label: 'Creative Minds Ltd.', value: '12' },
    { label: 'Pedro Santos', value: '13' },
    { label: 'Empresa Alpha S.A.', value: '14' },
    { label: 'Renato Lima', value: '15' },
    { label: 'Beta Solutions Ltda.', value: '16' },
    { label: 'Clara Ribeiro', value: '17' },
    { label: 'Consultoria Global', value: '18' },
    { label: 'Eduardo Barros', value: '19' },
    { label: 'Inovação Tech Ltda.', value: '20' },
    { label: 'Patricia Mendes', value: '21' },
    { label: 'Empresa Delta S.A.', value: '22' },
    { label: 'Ricardo Azevedo', value: '23' },
    { label: 'Star Technologies Inc.', value: '24' }
];

const convitesData = [
    { label: 'CONVITES IMPRESSOS', value: '-1', type: 'impresso' },
    { label: 'CINETICKET', value: '4', type: 'impresso' },
    { label: 'CINETICKET 3D', value: '2', type: 'impresso' },
    { label: 'CINETICKET COMBO', value: '5', type: 'impresso' },
    { label: 'CINETICKET PLATINUM', value: '3', type: 'impresso' },
    { label: 'CINETICKETONLINE2D', value: '66', type: 'impresso' },
    { label: 'Vale Ingresso Platinum', value: '59', type: 'impresso' },
    { label: 'Vale Ingresso Azul', value: '57', type: 'impresso' },
    { label: 'Vale Ingresso Lilas', value: '56', type: 'impresso' },
    { label: 'Vale Ingresso Vermelho', value: '55', type: 'impresso' },
    { label: 'CONVITES ELETRÔNICOS', value: '-2', type: 'eletronico' },
    { label: 'AZUL3D', value: '122', type: 'eletronico' },
    { label: 'BFRIDAY21', value: '82', type: 'eletronico' },
    { label: 'CLASSE ECOMONICA', value: '88', type: 'eletronico' },
    { label: 'CORTEDOTZ', value: '40', type: 'eletronico' },
    { label: 'CT2D', value: '53', type: 'eletronico' },
    { label: 'CT99', value: '37', type: 'eletronico' },
    { label: 'CTBR2016', value: '49', type: 'eletronico' },
    { label: 'CTBR2017', value: '9', type: 'eletronico' },
    { label: 'CTBR2D', value: '23', type: 'eletronico' },
];

const listaOperadores = [
    { label: '-- Todos --', value: '' },
    { label: 'Internet', value: '1' },
    { label: 'Erika Alves dos Santos', value: '2' },
    { label: 'Fernanda de Lima Oliveira', value: '3' },
    { label: 'Kinoplex mais', value: '4' },
    { label: 'Larissa de Lima Fernandes Ramos', value: '5' },
];

const FiltroVendas = ({ rows, setRows }: Props) => {
    const [search, setSearch] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('Todas');
    const [selectedLocal, setSelectedLocal] = useState<{ label: string; value: string } | null>(locaisEntrega[0]);
    const [selectedCliente, setSelectedCliente] = useState<{ label: string; value: string } | null>(listaClientes[0]);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), -30));
    const [selectedTipoConvite, setSelectedTipoConvite] = useState<{ label: string; value: string } | null>(convitesData[0]);
    const [selectedOperador, setSelectedOperador] = useState<{ label: string; value: string } | null>(listaOperadores[0]);

    const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
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

    const handleStatusFilter = (event: ChangeEvent<HTMLInputElement>) => {
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

    const handleLocalChange = (event: any, newValue: { label: string; value: string } | null) => {
        setSelectedLocal(newValue);

        if (newValue && newValue.value) {
            const filteredRows = rows.filter((row: KeyedObject) => row.localEntrega === newValue.value);
            setRows(filteredRows);
        } else {
            setRows(rows);
        }
    };

    const handleClienteChange = (event: any, newValue: { label: string; value: string } | null) => {
        setSelectedCliente(newValue);

        if (newValue && newValue.value) {
            const filteredRows = rows.filter((row: KeyedObject) => row.listaClientes === newValue.value);
            setRows(filteredRows);
        } else {
            setRows(rows);
        }
    };

    const handleDateChange = (newDate: Date | null, isStartDate: boolean) => {
        if (isStartDate) {
            setStartDate(newDate);
        } else {
            setEndDate(newDate);
        }

        const currentStartDate = isStartDate ? newDate : startDate;
        const currentEndDate = isStartDate ? endDate : newDate;

        const filteredRows = rows.filter((row: KeyedObject) => {
            const rowDate = new Date(row.date);
            return (
                (!currentStartDate || rowDate >= currentStartDate) &&
                (!currentEndDate || rowDate <= currentEndDate)
            );
        });
        setRows(filteredRows);
    };

    const handleTipoConviteChange = (event: any, newValue: { label: string; value: string } | null) => {
        setSelectedTipoConvite(newValue);

        if (newValue && newValue.value) {
            const filteredRows = rows.filter((row: KeyedObject) => row.tipoConvite === newValue.value);
            setRows(filteredRows);
        } else {
            setRows(rows);
        }
    };

    const handleOperadorChange = (event: any, newValue: { label: string; value: string } | null) => {
        setSelectedOperador(newValue);

        if (newValue && newValue.value) {
            const filteredRows = rows.filter((row: KeyedObject) => row.listaOperadores === newValue.value);
            setRows(filteredRows);
        } else {
            setRows(rows);
        }
    };

    return (
        <Grid container spacing={1}>

            <Grid container xs={12} md={7} spacing={1}>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Cliente:</FormLabel>
                    <Autocomplete
                        options={listaClientes}
                        getOptionLabel={(option) => option.label}
                        value={selectedCliente}
                        onChange={handleClienteChange}
                        renderInput={(params) => <TextField {...params} placeholder="Selecione o Cliente" size="small" />}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por ID:</FormLabel>
                    <TextField
                        onChange={handleSearch}
                        placeholder="Insira o ID"
                        value={search}
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">
                        Filtrar por Data:
                    </FormLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DatePicker
                                label="Data Início"
                                value={endDate}
                                onChange={(date) => handleDateChange(date, true)}
                                slots={{ textField: TextField }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        size: "small",
                                        InputProps: {
                                            value: endDate ? format(endDate, 'dd/MM/yyyy') : '',
                                        },
                                    },
                                }}
                                sx={{ mr: '8px' }}
                            />
                            <DatePicker
                                label="Data Fim"
                                value={startDate}
                                onChange={(date) => handleDateChange(date, false)}
                                slots={{ textField: TextField }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "outlined",
                                        size: "small",
                                        InputProps: {
                                            value: startDate ? format(startDate, 'dd/MM/yyyy') : '',
                                        },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Local Entrega:</FormLabel>
                    <Autocomplete
                        options={locaisEntrega}
                        getOptionLabel={(option) => option.label}
                        value={selectedLocal}
                        onChange={handleLocalChange}
                        renderInput={(params) => <TextField {...params} placeholder="Local de Entrega" size="small" />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Tipo de Convite:</FormLabel>
                    <Autocomplete
                        options={convitesData}
                        getOptionLabel={(option) => option.label}
                        value={selectedTipoConvite}
                        onChange={handleTipoConviteChange}
                        renderInput={(params) => <TextField {...params} placeholder="Selecione o Tipo de Convite" size="small"/>}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Operador:</FormLabel>
                    <Autocomplete
                        options={listaOperadores}
                        getOptionLabel={(option) => option.label}
                        value={selectedOperador}
                        onChange={handleOperadorChange}
                        renderInput={(params) => <TextField {...params} placeholder="Selecione o Operador" size="small" />}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} md={5}>
                <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Status:</FormLabel>
                <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="status"
                            name="status-filter"
                            value={selectedStatus}
                            onChange={handleStatusFilter}
                        >
                            <FormControlLabel value="Todas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Todas" />
                            <FormControlLabel value="Confirmadas/Pagas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Confirmadas/Pagas" />
                            <FormControlLabel value="Aguardando aprovação" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Aguardando aprovação" />
                            <FormControlLabel value="Sem validação de e-mail" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Sem validação de e-mail" />
                            <FormControlLabel value="Sem confirmação de pagamento" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Sem confirmação de pagamento" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="status"
                            name="status-filter"
                            value={selectedStatus}
                            onChange={handleStatusFilter}
                        >
                            <FormControlLabel value="Canceladas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Canceladas" />
                            <FormControlLabel value="Separadas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Separadas" />
                            <FormControlLabel value="Não Separadas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Não Separadas" />
                            <FormControlLabel value="Não confirmadas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Não confirmadas" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default FiltroVendas;
