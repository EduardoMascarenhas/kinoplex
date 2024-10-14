import { useState, useMemo } from 'react';

// material-ui
import { Box, Stack, MenuItem, Grid, Chip, Tooltip, FormControl, InputLabel, Select } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarQuickFilter, GridLogicOperator } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// time config
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// icons
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

// project import
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import useConfig from 'hooks/useConfig';
//import { CSVExport } from 'views/forms/tables/TableExports';
// types
import { ThemeMode } from 'types/config';

dayjs.extend(utc);
dayjs.extend(timezone);

// table columns
const columns: GridColDef[] = [
    {
        field: 'day',
        headerName: 'Dia',
        flex: 0.5,
        renderCell: (params) => {
            const day = params.row.day;
            return <Tooltip title={day}>{day}</Tooltip>;
        }
    },
    {
        field: 'event',
        headerName: 'Evento',
        description: 'Tipo de Evento',
        sortable: true,
        flex: 1,
        minWidth: 160,
        renderCell: (params) => {
            const event = params.row.event;
            return <Tooltip title={event}>{event}</Tooltip>;
        }
    },
    {
        field: 'complex',
        headerName: 'Complexo',
        flex: 1.5,
        minWidth: 164,
        renderCell: (params) => {
            const complex = params.row.complex;
            return <Tooltip title={complex}>{complex}</Tooltip>;
        }
    },
    {
        field: 'client',
        headerName: 'Cliente',
        flex: 1.5,
        minWidth: 164,
        renderCell: (params) => {
            const client = params.row.client;
            return <Tooltip title={client}>{client}</Tooltip>;
        }
    },
    {
        field: 'situation',
        headerName: 'Situação',
        flex: 1,
        minWidth: 164,
        renderCell: (params) => {
            const situation = params.row.situation;
            if (situation === 'FINALIZADO_PAGO') {
                return (
                    <Tooltip title="Finalizado - Pago">
                        <Chip label="Finalizado - Pago" color="success" variant="outlined" />
                    </Tooltip>
                );
            }
            if (situation === 'CONFIRMADO_AGUARDANDO_PAGAMENTO') {
                return (
                    <Tooltip title="Confirmado - Aguardando Pagamento">
                        <Chip label="Confirmado - Aguardando Pagamento" color="secondary" variant="outlined" />
                    </Tooltip>
                );
            }
            if (situation === 'CONFIRMADO') {
                return (
                    <Tooltip title="Confirmado">
                        <Chip label="Confirmado" color="primary" variant="outlined" />
                    </Tooltip>
                );
            }
            if (situation === 'CANCELADO') {
                return (
                    <Tooltip title="Cancelado">
                        <Chip label="Cancelado" color="error" variant="outlined" />
                    </Tooltip>
                );
            }
        }
    },
    {
        field: 'action',
        headerName: 'Ação',
        minWidth: 50,
        renderCell: (params) => {
            return <MenuActions id={params.row.id} status={params.row.status} />;
        }
    }
];

// table rows
const rows: GridRowsProp = [
    {
        id: 1,
        day: '12/09/2024',
        event: 'Sessão Escola- 12/09',
        complex: 'Kinoplex Patio Brasil',
        client: 'Centro de Ensino Médio da Asa Norte',
        situation: 'FINALIZADO_PAGO'
    },
    {
        id: 2,
        day: '12/09/2024',
        event: 'Sessão Escola- 12/09',
        complex: 'Kinoplex ParkShopping',
        client: 'ASSOCIACAO DE PAIS E MESTRES DA ESCOLA CLASSE N 4 N B',
        situation: 'CONFIRMADO_AGUARDANDO_PAGAMENTO'
    },
    {
        id: 3,
        day: '15/10/2024',
        event: 'Evento Matinal - 15/10',
        complex: 'Kinoplex Boulevard',
        client: 'REAL BROTHER TRANSPORTES LTDA',
        situation: 'FINALIZADO_PAGO'
    },
    {
        id: 4,
        day: '02/10/2024',
        event: 'Aniversário Infantil - 09/11',
        complex: 'Kinoplex Dom Pedro',
        client: 'CONDOMINIO SHOPPING PARQUE DOM PEDRO',
        situation: 'CONFIRMADO'
    },
    {
        id: 5,
        day: '10/12/2024',
        event: 'Sessão Fechada - 10/12',
        complex: 'Kinoplex Maceio',
        client: 'Escola Estadual Aurelina Palmeira de Melo',
        situation: 'FINALIZADO_PAGO'
    },
    {
        id: 6,
        day: '12/09/2024',
        event: 'Sessão Escola- 12/09',
        complex: 'Kinoplex Patio Brasil',
        client: 'Centro de Ensino Médio da Asa Norte',
        situation: 'CANCELADO'
    },
    {
        id: 7,
        day: '12/09/2024',
        event: 'Sessão Escola- 12/09',
        complex: 'Kinoplex ParkShopping',
        client: 'ASSOCIACAO DE PAIS E MESTRES DA ESCOLA CLASSE N 4 N B',
        situation: 'CONFIRMADO_AGUARDANDO_PAGAMENTO'
    },
    {
        id: 8,
        day: '15/10/2024',
        event: 'Evento Matinal - 15/10',
        complex: 'Kinoplex Boulevard',
        client: 'REAL BROTHER TRANSPORTES LTDA',
        situation: 'FINALIZADO_PAGO'
    },
    {
        id: 9,
        day: '15/10/2024',
        event: 'Aniversário Infantil - 09/11',
        complex: 'Kinoplex Dom Pedro',
        client: 'CONDOMINIO SHOPPING PARQUE DOM PEDRO',
        situation: 'CONFIRMADO_AGUARDANDO_PAGAMENTO'
    },
    {
        id: 10,
        day: '10/12/2024',
        event: 'Sessão Fechada - 10/12',
        complex: 'Kinoplex Maceio',
        client: 'Escola Estadual Aurelina Palmeira de Melo',
        situation: 'FINALIZADO_PAGO'
    },
    {
        id: 11,
        day: '15/10/2024',
        event: 'Aniversário Infantil - 09/11',
        complex: 'Kinoplex Dom Pedro',
        client: 'CONDOMINIO SHOPPING PARQUE DOM PEDRO',
        situation: 'CONFIRMADO_AGUARDANDO_PAGAMENTO'
    },
    {
        id: 12,
        day: '10/12/2024',
        event: 'Sessão Fechada - 10/12',
        complex: 'Kinoplex Maceio',
        client: 'Escola Estadual Aurelina Palmeira de Melo',
        situation: 'FINALIZADO_PAGO'
    }
];

function TableDataGrid({ Selected, fRows }: { Selected: any; fRows: GridRowsProp }) {
    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={fRows}
                columns={columns}
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7
                        }
                    },
                    filter: {
                        filterModel: {
                            items: [],
                            quickFilterLogicOperator: GridLogicOperator.Or
                        }
                    }
                }}
                hideFooterSelectedRowCount
                slots={{ toolbar: QuickSearchToolbar }}
                checkboxSelection={false}
                pageSizeOptions={[7, 15, 50, 100, 250]}
                onRowSelectionModelChange={(newSelectionModel) => {
                    const selectedIDs = new Set(newSelectionModel);
                    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
                    Selected(selectedRowData);
                }}
                disableColumnFilter
                disableColumnMenu
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
}

const MenuActions = (params: any) => {
    const { mode } = useConfig();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = anchorEl ? true : false;
    const handleClickAcao = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseAcao = (event: any) => {
        setAnchorEl(null);
    };

    const cogColor = mode === ThemeMode.DARK ? '#fff' : '#364152';

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px'
                }}
            >
                <Tooltip title="Detalhes">
                    <VisibilityTwoTone
                        className="actions-icon-detalhes"
                        onClick={() => (window.location.href = `/evento/detalhes/${params.id}`)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Tooltip>
                <Tooltip title="Editar">
                    <EditTwoToneIcon
                        className="actions-icon-editar"
                        onClick={() => (window.location.href = `/evento/editar/${params.id}`)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Tooltip>
            </Box>
        </>
    );
};

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                pb: 0,
                pl: 3,
                pr: 2,
                pt: 2,
                '& .MuiFormControl-root > .MuiInputBase-root': {
                    p: 0.6,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'grey.50'
                },
                '& .MuiFormControl-root > .MuiInputBase-root:after': {
                    display: 'none'
                },
                '& .MuiFormControl-root > .MuiInputBase-root:before': {
                    display: 'none'
                },
                '& .MuiFormControl-root > .Mui-focused': {
                    border: '1px solid',
                    borderColor: 'primary.main'
                }
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput: string) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
                placeholder="Buscar"
            />
        </Box>
    );
}

const VISIBLE_FIELDS = ['day', 'event', 'complex', 'client', 'situation'];

export default function Events() {
    const [selectedSituation, setSelectedSituation] = useState('TODOS');
    const defaultDate = dayjs().tz('America/Sao_Paulo');
    const [startDate, setStartDate] = useState<Dayjs | null>(defaultDate.subtract(14, 'day')); // Data de início
    const [endDate, setEndDate] = useState<Dayjs | null>(defaultDate.add(14, 'day')); // Data de fim
    let headers: any = [];

    // Função para alterar o estado do filtro de modalidade
    const handleSituationChange = (event: any) => {
        setSelectedSituation(event.target.value);
    };

    // Função para filtrar as linhas com base nas datas e na situação
    const filteredRows = rows.filter((row) => {
        const rowDate = dayjs(row.day, 'DD/MM/YYYY'); // Converter string para Dayjs
        const filterBySituation = selectedSituation === 'TODOS' || row.situation === selectedSituation;
        const filterByDate =
            (!startDate || rowDate.isAfter(startDate, 'day') || rowDate.isSame(startDate, 'day')) &&
            (!endDate || rowDate.isBefore(endDate, 'day') || rowDate.isSame(endDate, 'day'));

        return filterBySituation && filterByDate;
    });

    const [selectedValue, setSelectedValue] = useState([]);
    const handlerClick = (data: any) => {
        setSelectedValue(data);
    };

    /* para exportar o csv
    let NewValue = selectedValue.length > 0 ? selectedValue : rows;
    */

    // Otherwise filter will be applied on fields such as the hidden column id
    const columns = useMemo(() => rows.filter((column) => VISIBLE_FIELDS.includes(column.field)), [rows]);

    columns.map((item) => {
        return headers.push({ label: item.headerName, key: item.field });
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="Lista de Eventos Cadastrados"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/*exportar para csv <CSVExport data={NewValue} filename={'data-grid-table.csv'} header={headers} />*/}
                            {/* Filtro por Situação */}
                            <FormControl sx={{ minWidth: 250 }}>
                                <InputLabel id="status-filter-label">Filtrar por Situação</InputLabel>
                                <Select
                                    labelId="status-filter-label"
                                    id="status-filter"
                                    value={selectedSituation}
                                    label="Filtrar por Situação"
                                    onChange={handleSituationChange} // Mantemos o mesmo handler para atualizar o valor selecionado
                                >
                                    <MenuItem value="TODOS">Todos</MenuItem>
                                    <MenuItem value="CONFIRMADO">Confirmado</MenuItem>
                                    <MenuItem value="FINALIZADO_PAGO">Finalizado - Pago</MenuItem>
                                    <MenuItem value="CONFIRMADO_AGUARDANDO_PAGAMENTO">Confirmado - Aguardando Pagamento</MenuItem>
                                    <MenuItem value="CANCELADO">Cancelado</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Filtro de Data */}
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="Data Início"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    format="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="Data Fim"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    format="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </Stack>
                    }
                >
                    <TableDataGrid Selected={handlerClick} fRows={filteredRows} />
                </MainCard>
            </Grid>
        </Grid>
    );
}
