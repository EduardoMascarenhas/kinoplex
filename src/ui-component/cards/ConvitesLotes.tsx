import React, { useState, useEffect } from 'react';

// material-ui
import { Box, Grid, Tooltip, Stack, Button, Typography } from '@mui/material';
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
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';

// project import
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

dayjs.extend(utc);
dayjs.extend(timezone);

// table rows
const rows: GridRowsProp = [
    {
        id: '0',
        loteAno: '01/2024',
        tipo: '	Vale Ingresso Azul',
        dataConfirmacao: '16/04/2024',
        series: {
            serie: '0',
            numeroInicial: '85803',
            numeroFinal: '94302',
            validade: '30/12/2024'
        }
    },
    {
        id: '1',
        loteAno: '03/2024',
        tipo: '	Vale Ingresso Vermelho',
        dataConfirmacao: '16/04/2024',
        series: {
            serie: '0',
            numeroInicial: '104587',
            numeroFinal: '546870',
            validade: '30/12/2024'
        }
    }
];

// table columns
const columns: GridColDef[] = [
    {
        field: 'loteAno',
        headerName: 'Lote / Ano',
        flex: 0.5,
        renderCell: (params) => {
            const loteAno = params.row.loteAno;
            return <Tooltip title={loteAno}>{loteAno}</Tooltip>;
        }
    },
    {
        field: 'tipo',
        headerName: 'Tipo',
        flex: 1,
        renderCell: (params) => {
            const tipo = params.row.tipo;
            return <Tooltip title={tipo}>{tipo}</Tooltip>;
        }
    },
    {
        field: 'dataConfirmacao',
        headerName: 'Data da Confirmação',
        flex: 1,
        renderCell: (params) => {
            const dataConfirmacao = params.row.dataConfirmacao;
            return <Tooltip title={dataConfirmacao}>{dataConfirmacao}</Tooltip>;
        }
    },
    {
        field: 'series',
        headerName: 'Séries',
        flex: 1.5,
        renderCell: (params) => {
            const series = params.row.series;
            return (
                <Box sx={{ display: 'flex', gap: '15px' }}>
                    <Tooltip
                        title={
                            <Box sx={{ display: 'flex', gap: '15px' }}>
                                <Box>
                                    <Typography variant={'h4'} color={'primary'}>
                                        Série
                                    </Typography>
                                    <p>{series.serie}</p>
                                </Box>
                                <Box>
                                    <Typography variant={'h4'} color={'primary'}>
                                        Nº Inicial
                                    </Typography>
                                    <p>{series.numeroInicial}</p>
                                </Box>
                                <Box>
                                    <Typography variant={'h4'} color={'primary'}>
                                        Nº Final
                                    </Typography>
                                    <p>{series.numeroFinal}</p>
                                </Box>
                                <Box>
                                    <Typography variant={'h4'} color={'primary'}>
                                        Validade
                                    </Typography>
                                    <p>{series.validade}</p>
                                </Box>
                            </Box>
                        }
                    >
                        <InfoTwoToneIcon color="primary" />
                    </Tooltip>
                    <Tooltip title={'Baixar'}>
                        <DownloadForOfflineTwoToneIcon color="secondary" sx={{ cursor: 'pointer' }} />
                    </Tooltip>
                </Box>
            );
        }
    },
    {
        field: 'action',
        headerName: 'Ação',
        minWidth: 50,
        renderCell: (params) => {
            return <MenuActions id={params.row.id} />;
        }
    }
];

// Action buttons
const MenuActions = (params: any) => {
    return (
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
                    onClick={() => (window.location.href = `/cliente/detalhes/${params.id}`)}
                    sx={{ cursor: 'pointer' }}
                />
            </Tooltip>
            <Tooltip title="Editar">
                <EditTwoToneIcon
                    className="actions-icon-editar"
                    onClick={() => (window.location.href = `/cliente/editar/${params.id}`)}
                    sx={{ cursor: 'pointer' }}
                />
            </Tooltip>
        </Box>
    );
};

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

// Quick Search toolbar
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

export default function ConvitesLotes() {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [filteredRows, setFilteredRows] = useState(rows); // Inicializa diretamente com 'rows'

    // Filtro por data de última compra
    useEffect(() => {
        if (startDate) {
            const filtered = rows.filter(
                (row) =>
                    dayjs(row.ultimaCompra, 'DD/MM/YYYY').isSame(startDate) || dayjs(row.ultimaCompra, 'DD/MM/YYYY').isBefore(startDate)
            );
            setFilteredRows(filtered);
        } else {
            setFilteredRows(rows); // Caso a data seja 'null', restaura as linhas originais
        }
    }, [startDate]);

    // Função para limpar a data e restaurar as linhas
    const handleClearDate = () => {
        setStartDate(null);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    title="Lista de Lotes de Convites"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="Ano"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    format="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <Button variant="outlined" onClick={handleClearDate}>
                                Limpar Data
                            </Button>
                        </Stack>
                    }
                >
                    <TableDataGrid Selected={() => {}} fRows={filteredRows} />
                </MainCard>
            </Grid>
        </Grid>
    );
}
