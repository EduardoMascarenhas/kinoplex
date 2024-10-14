import React, { useState, useEffect } from 'react';

// material-ui
import { Box, Grid, Tooltip, Stack, Button } from '@mui/material';
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

dayjs.extend(utc);
dayjs.extend(timezone);

// table rows
const rows: GridRowsProp = [
    {
        id: '1',
        tipo: 'PF',
        nomeRazaoSocial: 'Eduardo Mendes Souza Mascarenhas',
        documento: '13.023.115-06',
        apelido: 'Dudu',
        inscricaoMunicipal: '123456789',
        inscricaoEstadual: '987654321',
        suframa: 'amarfus',
        ramoAtividade: 'Programador',
        siteWeb: 'www.scale.com.br',
        numeroFuncionarios: 100,
        cep: '44034298',
        logradouro: 'Caminho 16',
        numero: '12',
        complemento: 'Feira VI',
        bairro: 'Campo Limpo',
        cidade: 'Feira de Santana',
        estado: 'Bahia',
        nomeContato: 'Eduardo Mendes Souza Mascarenhas',
        emailContato: 'eduardomsmascarenhas@gmail.com',
        cargoContato: 'Programador',
        telefoneContato: '(75) 9 9244-1809',
        ultimaCompra: '06/10/2024'
    },
    {
        id: '2',
        tipo: 'PJ',
        nomeRazaoSocial: 'Eduardo PJ',
        documento: '00.493.916/0001-20',
        apelido: 'DUDU Pj',
        inscricaoMunicipal: '987789456',
        inscricaoEstadual: '66666666',
        suframa: 'asdfasdf',
        ramoAtividade: 'Programador PJ',
        siteWeb: 'www.scalepj.com.br',
        numeroFuncionarios: 10,
        cep: '6549879324',
        logradouro: 'Rua x',
        numero: '10',
        complemento: 'Complemento X',
        bairro: 'Bairro X',
        cidade: 'Cidade X',
        estado: 'Estado X',
        nomeContato: 'Eduardo Pessoa Juridica',
        emailContato: 'eduardomsmascarenhas@pj.com',
        cargoContato: 'Programador PJ',
        telefoneContato: '(66) 6 6666-6666',
        ultimaCompra: '21/09/2024'
    }
];

// table columns
const columns: GridColDef[] = [
    {
        field: 'documento',
        headerName: 'CPF/CNPJ',
        flex: 0.5,
        renderCell: (params) => {
            const documento = params.row.documento;
            return <Tooltip title={documento}>{documento}</Tooltip>;
        }
    },
    {
        field: 'nomeRazaoSocial',
        headerName: 'Nome/Razão Social',
        flex: 0.5,
        renderCell: (params) => {
            const nomeRazaoSocial = params.row.nomeRazaoSocial;
            return <Tooltip title={nomeRazaoSocial}>{nomeRazaoSocial}</Tooltip>;
        }
    },
    {
        field: 'emailContato',
        headerName: 'Email',
        flex: 0.5,
        renderCell: (params) => {
            const emailContato = params.row.emailContato;
            return <Tooltip title={emailContato}>{emailContato}</Tooltip>;
        }
    },
    {
        field: 'telefoneContato',
        headerName: 'Telefone',
        flex: 0.5,
        renderCell: (params) => {
            const telefoneContato = params.row.telefoneContato;
            return <Tooltip title={telefoneContato}>{telefoneContato}</Tooltip>;
        }
    },
    {
        field: 'ultimaCompra',
        headerName: 'Última Compra',
        flex: 0.5,
        renderCell: (params) => {
            const ultimaCompra = params.row.ultimaCompra;
            return <Tooltip title={ultimaCompra}>{ultimaCompra}</Tooltip>;
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

export default function Clients() {
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
                    title="Lista de Clientes Cadastrados"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DatePicker
                                    label="Não Compra Desde"
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
