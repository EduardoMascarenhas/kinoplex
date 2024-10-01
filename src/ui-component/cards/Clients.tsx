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
        empresa: {
            tipo: 'PF',
            nomeRazaoSocial: 'Eduardo Mendes Souza Mascarenhas',
            documento: '13.023.115-06',
            apelido: 'Dudu',
            inscricaoMunicipal: '123456789',
            inscricaoEstadual: '987654321',
            suframa: 'amarfus',
            ramoAtividade: 'Programador',
            siteWeb: 'www.scale.com.br',
            numeroFuncionarios: 100
        },
        endereco: {
            cep: '44034298',
            logradouro: 'Caminho 16',
            numero: '12',
            complemento: 'Feira VI',
            bairro: 'Campo Limpo',
            cidade: 'Feira de Santana',
            estado: 'Bahia'
        },
        contatos: {
            nome: 'Eduardo Mendes Souza Mascarenhas',
            email: 'eduardomsmascarenhas@gmail.com',
            cargo: 'Programador',
            telefone: '(75) 9 9244-1809'
        }
    },
    {
        id: '2',
        empresa: {
            tipo: 'PJ',
            nomeRazaoSocial: 'Eduardo PJ',
            documento: '00.493.916/0001-20',
            apelido: 'DUDU Pj',
            inscricaoMunicipal: '987789456',
            inscricaoEstadual: '66666666',
            suframa: 'asdfasdf',
            ramoAtividade: 'Programador PJ',
            siteWeb: 'www.scalepj.com.br',
            numeroFuncionarios: 10
        },
        endereco: {
            cep: '6549879324',
            logradouro: 'Rua x',
            numero: '10',
            complemento: 'Complemento X',
            bairro: 'Bairro X',
            cidade: 'Cidade X',
            estado: 'Estado X'
        },
        contatos: {
            nome: 'Eduardo Pessoa Juridica',
            email: 'eduardomsmascarenhas@pj.com',
            cargo: 'Programador PJ',
            telefone: '(66) 6 6666-6666'
        }
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
        field: 'nomeRazaoSocial',
        headerName: 'Razão Social',
        flex: 1,
        renderCell: (params) => {
            const razao_social = params.row.empresa?.nomeRazaoSocial;
            return <Tooltip title={razao_social}>{razao_social}</Tooltip>;
        }
    },
    {
        field: 'documento',
        headerName: 'Documento',
        flex: 0.7,
        renderCell: (params) => {
            const documento = params.row.empresa?.documento;
            return <Tooltip title={documento}>{documento}</Tooltip>;
        }
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 0.5,
        renderCell: (params) => {
            const email = params.row.contato?.email;
            return <Tooltip title={email}>{email}</Tooltip>;
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

const VISIBLE_FIELDS = ['id', 'razao_social', 'nome_fantasia', 'cnpj', 'inscricao_estadual'];

export default function Clients() {
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
                <MainCard content={false} title="Lista de Clientes Cadastrados">
                    <TableDataGrid Selected={handlerClick} fRows={rows} />
                </MainCard>
            </Grid>
        </Grid>
    );
}
