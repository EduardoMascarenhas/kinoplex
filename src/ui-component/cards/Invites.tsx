import { useState, useMemo } from 'react';

// material-ui
import { Box, Stack, Menu, MenuItem, Grid, Chip, Checkbox, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams, GridToolbarQuickFilter, GridLogicOperator } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';

// icons
import { IconSettings } from '@tabler/icons-react';

// project import
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import useConfig from 'hooks/useConfig';
//import { CSVExport } from 'views/forms/tables/TableExports';
// types
import { ThemeMode } from 'types/config';

// table columns
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
        field: 'abreviatura',
        headerName: 'Abreviatura',
        description: 'Abreviatura do tipo de convite',
        sortable: true,
        flex: 1,
        minWidth: 160,
        valueGetter: (params: GridValueGetterParams) => `${params.row.abreviatura || ''}`
    },
    { field: 'descricao', headerName: 'Descrição', flex: 1.5, minWidth: 164 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.5,
        minWidth: 100
    },
    {
        field: 'modalidade',
        headerName: 'Modalidade',
        flex: 0.5,
        minWidth: 164,
        renderCell: (params) => {
            const modalidade = params.row.modalidade;
            if (modalidade === 'ELETRONICO') {
                return <Chip label="Eletrônico" color="primary" variant="outlined" />;
            }
            if (modalidade === 'IMPRESSO') {
                return <Chip label="Impresso" color="secondary" variant="outlined" />;
            }
        }
    },
    {
        field: 'precoUnitario',
        headerName: 'Preço Unitário',
        flex: 0.5,
        minWidth: 120,
        valueGetter: (params: GridValueGetterParams) => `${params.row.precoUnitario ? 'R$ ' + params.row.precoUnitario : ''}`
    },
    {
        field: 'categoria',
        headerName: 'Categoria',
        flex: 0.5,
        minWidth: 120
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
        id: 122,
        abreviatura: 'AZU',
        descricao: 'AZUL3D',
        status: 'INATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: null,
        categoria: 'CINETICKET'
    },
    {
        id: 82,
        abreviatura: 'BF',
        descricao: 'BFRIDAY21',
        status: 'INATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: 10.0,
        categoria: 'CINETICKET'
    },
    {
        id: 4,
        abreviatura: 'CT',
        descricao: 'CINETICKET',
        status: 'ATIVO',
        modalidade: 'IMPRESSO',
        precoUnitario: 17.0,
        categoria: 'CINETICKET'
    },
    {
        id: 2,
        abreviatura: 'CT3D',
        descricao: 'CINETICKET 3D',
        status: 'ATIVO',
        modalidade: 'IMPRESSO',
        precoUnitario: 20.0,
        categoria: 'CINETICKET'
    },
    {
        id: 5,
        abreviatura: 'CTCOMBO',
        descricao: 'CINETICKET COMBO',
        status: 'ATIVO',
        modalidade: 'IMPRESSO',
        precoUnitario: 29.0,
        categoria: 'CINETICKET'
    },
    {
        id: 3,
        abreviatura: 'CTPLAT',
        descricao: 'CINETICKET PLATINUM',
        status: 'INATIVO',
        modalidade: 'IMPRESSO',
        precoUnitario: 45.0,
        categoria: 'CONVITE CORTESIA ELETRÔNICO'
    },
    {
        id: 66,
        abreviatura: 'CTONLINE2D',
        descricao: 'CINETICKETONLINE2D',
        status: 'INATIVO',
        modalidade: 'IMPRESSO',
        precoUnitario: 18.88,
        categoria: 'CONVITE CORTESIA'
    },
    {
        id: 88,
        abreviatura: 'cec',
        descricao: 'CLASSE ECOMONICA',
        status: 'ATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: 0.0,
        categoria: 'CINETICKET BOMBONIERE ELETRÔNICO'
    },
    {
        id: 40,
        abreviatura: 'CORTEDOTZ',
        descricao: 'CORTEDOTZ',
        status: 'ATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: 0.0,
        categoria: 'CINETICKET BOMBONIERE'
    },
    {
        id: 119,
        abreviatura: 'NPS',
        descricao: 'Cortesia NPS',
        status: 'INATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: null,
        categoria: 'CINETICKET COMBO ELETRÔNICO'
    },
    {
        id: 53,
        abreviatura: 'CT2D',
        descricao: 'CT2D',
        status: 'INATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: 17.0,
        categoria: 'CINETICK ELETRÔNICO'
    },
    {
        id: 37,
        abreviatura: 'CT99',
        descricao: 'CT99',
        status: 'ATIVO',
        modalidade: 'ELETRONICO',
        precoUnitario: 14.0,
        categoria: 'CINETICKET COMBO'
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
                getRowClassName={(params) => {
                    if (params.row.status === 'ATIVO') {
                        return 'ativo-row';
                    } else if (params.row.status === 'INATIVO') {
                        return 'inativo-row';
                    }
                    return '';
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
                    alignItems: 'center'
                }}
            >
                <IconSettings
                    id={`icon-${params.id}`}
                    className="actions-icon teste"
                    fontSize="small"
                    aria-controls={open ? `menu-${params.id}` : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickAcao}
                    color={cogColor}
                />
                <Menu
                    id={`menu-${params.id}`}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseAcao}
                    MenuListProps={{
                        'aria-labelledby': `${params.id}`
                    }}
                >
                    <MenuItem onClick={() => console.log(`alterar ${params.id}`)}>Alterar</MenuItem>

                    {params.status === 'ATIVO' ? <MenuItem onClick={() => console.log(`inativar ${params.id}`)}>Inativar</MenuItem> : <></>}
                    {params.status === 'INATIVO' ? <MenuItem onClick={() => console.log(`ativar ${params.id}`)}>Ativar</MenuItem> : <></>}
                </Menu>
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

const VISIBLE_FIELDS = ['abreviatura', 'descricao', 'status', 'modalidade', 'precoUnitario', 'categoria'];

export default function Invites() {
    const [showInactive, setShowInactive] = useState(false);
    const [selectedModalidade, setSelectedModalidade] = useState('TODOS');
    let headers: any = [];

    // Função para alterar o estado do filtro de modalidade
    const handleRadioChange = (event: any) => {
        setSelectedModalidade(event.target.value);
    };
    // Função para alternar o estado do filtro de "INATIVO"
    const handleCheckboxChange = (event: any) => {
        setShowInactive(event.target.checked);
    };
    // Filtrando as linhas com base no status (ativo/inativo) e na modalidade
    const filteredRows = rows.filter((row) => {
        const filterByModalidade = selectedModalidade === 'TODOS' || row.modalidade === selectedModalidade;
        const filterByStatus = showInactive || row.status === 'ATIVO';
        return filterByModalidade && filterByStatus;
    });

    const [selectedValue, setSelectedValue] = useState([]);
    const handlerClick = (data: any) => {
        setSelectedValue(data);
    };

    let NewValue = selectedValue.length > 0 ? selectedValue : rows;

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
                    title="Lista de Convites Cadastrados"
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/*exportar para csv <CSVExport data={NewValue} filename={'data-grid-table.csv'} header={headers} />*/}

                            <FormControlLabel
                                control={<Checkbox checked={showInactive} onChange={handleCheckboxChange} color="primary" />}
                                label="Mostrar Inativo"
                            />
                            <RadioGroup row value={selectedModalidade} onChange={handleRadioChange}>
                                <FormControlLabel value="TODOS" control={<Radio />} label="Todos" />
                                <FormControlLabel value="IMPRESSO" control={<Radio />} label="Impresso" />
                                <FormControlLabel value="ELETRONICO" control={<Radio />} label="Eletrônico" />
                            </RadioGroup>
                        </Stack>
                    }
                >
                    <TableDataGrid Selected={handlerClick} fRows={filteredRows} />
                </MainCard>
            </Grid>
        </Grid>
    );
}
