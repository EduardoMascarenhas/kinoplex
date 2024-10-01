import React, { useState, useMemo } from 'react';

// material-ui
import { Box, Grid, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarQuickFilter, GridLogicOperator } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
// time config
import dayjs from 'dayjs';
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

// table rows
const rows: GridRowsProp = [
    {
        id: '1',
        dataCriacao: '02/09/2024',
        cliente: 'Kinoplex',
        razaoSocial: 'Laboratório de Análises Clínicas',
        cpfCnpj: '46043998000102',
        quantidadeTotal: '500',
        valorTotal: 'R$ 3.000,50'
    },
    {
        id: '2',
        dataCriacao: '29/09/2024',
        cliente: 'Cliente 2 de Teste',
        razaoSocial: 'Clínicas Análises de Laboratório  ',
        cpfCnpj: '80001024604399',
        quantidadeTotal: '1500',
        valorTotal: 'R$ 50.000,75'
    },
    {
        id: '3',
        dataCriacao: '01/10/2024',
        cliente: 'HG',
        razaoSocial: 'Hospital Geral',
        cpfCnpj: '465778952321000114',
        quantidadeTotal: '100',
        valorTotal: 'R$ 10.000,00'
    }
];

// table columns
const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 0.5,
        renderCell: (params) => {
            const id = params.row.id;
            return <Tooltip title={id}>{id}</Tooltip>;
        }
    },
    {
        field: 'dataCriacao',
        headerName: 'Data Criação',
        flex: 0.5,
        renderCell: (params) => {
            const { dataCriacao } = params.row;
            return <Tooltip title={dataCriacao}>{dataCriacao}</Tooltip>;
        }
    },
    {
        field: 'razaoSocial',
        headerName: 'Cliente',
        flex: 0.5,
        renderCell: (params) => {
            const { razaoSocial } = params.row;
            return <Tooltip title={razaoSocial}>{razaoSocial}</Tooltip>;
        }
    },
    {
        field: 'cpfCnpj',
        headerName: 'CPF/CNPJ',
        flex: 0.5,
        renderCell: (params) => {
            const { cpfCnpj } = params.row;
            return <Tooltip title={cpfCnpj}>{cpfCnpj}</Tooltip>;
        }
    },
    {
        field: 'valorTotal',
        headerName: 'Valor Total',
        flex: 0.5,
        renderCell: (params) => {
            const { valorTotal } = params.row;
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Tooltip title={valorTotal}>{valorTotal}</Tooltip>
                </Box>
            );
        }
    },
    {
        field: 'quantidadeTotal',
        headerName: 'Quantidade Total',
        flex: 0.5,
        renderCell: (params) => {
            const { quantidadeTotal } = params.row;
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Tooltip title={quantidadeTotal}>{quantidadeTotal}</Tooltip>
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
                        onClick={() => (window.location.href = `/oportunidade/novo`)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Tooltip>
                <Tooltip title="Editar">
                    <EditTwoToneIcon
                        className="actions-icon-editar"
                        onClick={() => (window.location.href = `/oportunidade/novo`)}
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

const VISIBLE_FIELDS = ['id', 'dataCriacao', 'razaoSocial', 'cpfCnpj', 'valorTotal', 'quantidadeTotal'];

export default function Opportunity() {
    let headers: any = [];
    const handlerClick = (data: any) => {
        //setSelectedValue(data);
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
                <MainCard content={false} title="Lista de Oportunidades Cadastradas">
                    <TableDataGrid Selected={handlerClick} fRows={rows} />
                </MainCard>
            </Grid>
        </Grid>
    );
}
