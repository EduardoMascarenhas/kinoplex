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
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { styled } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses, TreeItemProps } from '@mui/x-tree-view/TreeItem';
import Checkbox from '@mui/material/Checkbox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Menu from '@mui/material/Menu';
import { Button, IconButton } from '@mui/material';
import FilterListTwoToneIcon from '@mui/icons-material/FilterListTwoTone';
import SearchIcon from '@mui/icons-material/Search';

// ==============================|| INVOICE LIST - FILTER ||============================== //

interface Props {
    rows: Invoice[];
    setRows: (rows: Invoice[]) => void;
    expandedItems?: string[];
}

const CustomTreeItem: React.FC<TreeItemProps> = styled(TreeItem)(({ }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    '&.styleTree': {
        backgroundColor: '#ebebeb',
        margin: '2px',
        '& .MuiTreeItem-label': {
            margin: 0,
            '& .MuiTypography-root': {
                fontSize: '0.975em',
                fontWeight: 500,
            },
        },
        '& .MuiCollapse-root': {
            margin: 0,
            '& .MuiTypography-root': {
                fontSize: '0.8em',
                fontWeight: 'normal',
            },
        },
    },

    '& .MuiTreeItem-label': {

        '& .MuiTypography-root': {
            fontSize: '0.85em'
        },
        '& .MuiCheckbox-root': {
            padding: '0 4px'
        }
    },
}));

const IconButtonCheckbox = styled(IconButton)(() => ({
    backgroundColor: '#f8fafc',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    borderRadius: '8px',
    padding: '6px',
    border: '1px solid #2196f3'
}));
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

const convitesData = [
    { label: 'CINETICKET', value: '4', type: 'impresso' },
    { label: 'CINETICKET 3D', value: '2', type: 'impresso' },
    { label: 'CINETICKET COMBO', value: '5', type: 'impresso' },
    { label: 'CINETICKET PLATINUM', value: '3', type: 'impresso' },
    { label: 'CINETICKETONLINE2D', value: '66', type: 'impresso' },
    { label: 'Vale Ingresso Platinum', value: '59', type: 'impresso' },
    { label: 'Vale Ingresso Azul', value: '57', type: 'impresso' },
    { label: 'Vale Ingresso Lilas', value: '56', type: 'impresso' },
    { label: 'Vale Ingresso Vermelho', value: '55', type: 'impresso' },
    { label: 'CINETICKET PLATINUM', value: '322', type: 'impresso' },
    { label: 'CINETICKETONLINE2D', value: '661', type: 'impresso' },
    { label: 'Vale Ingresso Platinum', value: '509', type: 'impresso' },
    { label: 'Vale Ingresso Azul', value: '570', type: 'impresso' },
    { label: 'Vale Ingresso Lilas', value: '560', type: 'impresso' },
    { label: 'Vale Ingresso Vermelho', value: '555', type: 'impresso' },
    { label: 'Vale Ingresso Azul', value: '5701', type: 'impresso' },
    { label: 'Vale Ingresso Lilas', value: '5601', type: 'impresso' },
    { label: 'Vale Ingresso Vermelho', value: '5155', type: 'impresso' },
    { label: 'AZUL3D', value: '122', type: 'eletronico' },
    { label: 'BFRIDAY21', value: '82', type: 'eletronico' },
    { label: 'CLASSE ECOMONICA', value: '88', type: 'eletronico' },
    { label: 'CORTEDOTZ', value: '40', type: 'eletronico' },
    { label: 'CT2D', value: '53', type: 'eletronico' },
    { label: 'CT99', value: '37', type: 'eletronico' },
    { label: 'CTBR2016', value: '49', type: 'eletronico' },
    { label: 'CTBR2017', value: '9', type: 'eletronico' },
    { label: 'CTBR2D', value: '23', type: 'eletronico' },
    { label: 'AZUL3D', value: '123', type: 'eletronico' },
    { label: 'BFRIDAY21', value: '83', type: 'eletronico' },
    { label: 'CLASSE ECOMONICA', value: '188', type: 'eletronico' },
    { label: 'CORTEDOTZ', value: '41', type: 'eletronico' },
    { label: 'CT2D', value: '54', type: 'eletronico' },
    { label: 'CT99', value: '38', type: 'eletronico' },
    { label: 'CTBR2016', value: '50', type: 'eletronico' },
    { label: 'CTBR2017', value: '10', type: 'eletronico' },
    { label: 'CTBR2D', value: '24', type: 'eletronico' },
];

const listaOperadores = [
    { label: '-- Todos --', value: '' },
    { label: 'Internet', value: '1' },
    { label: 'Erika Alves dos Santos', value: '2' },
    { label: 'Fernanda de Lima Oliveira', value: '3' },
    { label: 'Kinoplex mais', value: '4' },
    { label: 'Larissa de Lima Fernandes Ramos', value: '5' },
];

const FiltroVendas = ({ rows, setRows, expandedItems = ['impresso', 'eletronico'] }: Props) => {
    const [searchId, setSearchId] = useState<string>('');
    const [searchClient, setSearchClient] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('Todas');
    const [selectedLocal, setSelectedLocal] = useState<{ label: string; value: string } | null>(locaisEntrega[0]);
    const [selectedOperador, setSelectedOperador] = useState<{ label: string; value: string } | null>(listaOperadores[0]);
    const [checkedItems, setCheckedItems] = useState<string[]>(convitesData.map(item => item.value));

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), -30));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Função para aplicar todos os filtros
    const applyFilters = () => {
        let filteredRows = rows;

        // Filtro por ID
        if (searchId) {
            filteredRows = filteredRows.filter((row: KeyedObject) => row.id.toString().includes(searchId));
        }

        // Filtro por Cliente
        if (searchClient) {
            filteredRows = filteredRows.filter((row: KeyedObject) => row.cliente && row.cliente.includes(searchClient));
        }

        // Filtro por Status
        if (selectedStatus !== 'Todas') {
            filteredRows = filteredRows.filter((row: KeyedObject) => row.status === selectedStatus);
        }

        // Filtro por Local de Entrega
        if (selectedLocal && selectedLocal.value) {
            filteredRows = filteredRows.filter((row: KeyedObject) => row.localEntrega === selectedLocal.value);
        }

        // Filtro por Operador Selecionado
        if (selectedOperador && selectedOperador.value) {
            filteredRows = filteredRows.filter((row: KeyedObject) => row.operador === selectedOperador.value);
        }

        // Filtrar por valores dos checkboxes
        if (checkedItems.length > 0) {
            filteredRows = filteredRows.filter((row) => checkedItems.includes(row.tipoConvite));
        }

        // Aplica o filtro de datas
        if (startDate && endDate) {
            filteredRows = filteredRows.filter((row: KeyedObject) => {
                const rowDate = new Date(row.date); // Assegurar que row.date seja uma data
                return rowDate >= startDate && rowDate <= endDate;
            });
        }

        setRows(filteredRows);
    };

    // Função para lidar com a seleção de grupo ou item único
    const handleToggle = (value: string, children: string[] = []) => {
        const currentIndex = checkedItems.indexOf(value);
        let newChecked = [...checkedItems];

        if (children.length > 0) {
            if (areAllChildrenChecked(children)) {
                newChecked = newChecked.filter((item) => item !== value && !children.includes(item));
            } else {
                newChecked = [...newChecked, value, ...children.filter((child) => !newChecked.includes(child))];
            }
        } else {
            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
        }

        setCheckedItems(newChecked);

        // Filtrar linhas com base nos itens marcados
        if (newChecked.length > 0) {
            const filteredRows = rows.filter((row) => newChecked.includes(row.tipoConvite));
            setRows(filteredRows);
        } else {
            setRows(rows); // Exibir todas as linhas se nada estiver selecionado
        }

        applyFilters();
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Função para verificar se todos os filhos estão selecionados
    const areAllChildrenChecked = (children: string[]) => {
        return children.every((child) => checkedItems.includes(child));
    };

    const renderTreeItems = (type: string) => {
        const filteredItems = convitesData.filter((item) => item.type === type);

        // Dividir em grupos de 5 itens por coluna
        const columns = [];
        for (let i = 0; i < filteredItems.length; i += 8) {
            columns.push(filteredItems.slice(i, i + 8));
        }

        return (
            <Grid container spacing={2}>
                {columns.map((column, columnIndex) => (
                    <Grid item key={columnIndex} xs={4}> {/* xs={6} deixa 2 colunas na linha */}
                        {column.map((item) => (
                            <CustomTreeItem
                                key={item.value}
                                itemId={item.value}
                                label={
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkedItems.includes(item.value)} // Verifica se o item filho está checado
                                                onChange={() => handleToggle(item.value)}
                                            />
                                        }
                                        label={item.label}
                                    />
                                }
                            />
                        ))}
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <Grid container spacing={1}>

            <Grid container xs={12} md={7} spacing={1}>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Cliente:</FormLabel>
                    <TextField
                        onChange={(e) => setSearchClient(e.target.value)}
                        placeholder="Digite o cliente"
                        value={searchClient}
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por ID:</FormLabel>
                    <TextField
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Insira o ID"
                        value={searchId}
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
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
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
                                sx={{ mr: '8px' }}
                            />
                            <DatePicker
                                label="Data Fim"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
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
                        onChange={(event, newValue) => setSelectedLocal(newValue)}
                        renderInput={(params) => <TextField {...params} placeholder="Local de Entrega" size="small" />}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Tipo de Convite:</FormLabel>
                    <IconButtonCheckbox
                        color="primary"
                        size="small"
                        disableRipple
                        aria-label="live customize"
                        onClick={handleClick}
                    >
                        Convites impressos e eletrônicos<FilterListTwoToneIcon />
                    </IconButtonCheckbox>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <SimpleTreeView
                            sx={{ display: { md: 'flex', xs: 'block' } }}
                            defaultExpandedItems={expandedItems}
                            slots={{
                                expandIcon: AddBoxIcon,
                                collapseIcon: IndeterminateCheckBoxIcon,
                            }}
                        >
                            <CustomTreeItem
                                className="styleTree"
                                itemId="impresso"
                                label={
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={areAllChildrenChecked(
                                                    convitesData.filter((item) => item.type === 'impresso').map((item) => item.value)
                                                )}
                                                onChange={() =>
                                                    handleToggle(
                                                        'impresso',
                                                        convitesData.filter((item) => item.type === 'impresso').map((item) => item.value)
                                                    )
                                                }
                                            />
                                        }
                                        label="Convites Impressos"
                                    />
                                }
                            >
                                {renderTreeItems('impresso')}
                            </CustomTreeItem>
                            <CustomTreeItem
                                className="styleTree"
                                itemId="eletronico"
                                label={
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={areAllChildrenChecked(
                                                    convitesData.filter((item) => item.type === 'eletronico').map((item) => item.value)
                                                )}
                                                onChange={() =>
                                                    handleToggle(
                                                        'eletronico',
                                                        convitesData.filter((item) => item.type === 'eletronico').map((item) => item.value)
                                                    )
                                                }
                                            />
                                        }
                                        label="Convites Eletrônicos"
                                    />
                                }
                            >
                                {renderTreeItems('eletronico')}
                            </CustomTreeItem>
                        </SimpleTreeView>
                    </Menu>
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Operador:</FormLabel>
                    <Autocomplete
                        options={listaOperadores}
                        getOptionLabel={(option) => option.label}
                        value={selectedOperador}
                        onChange={(event, newValue) => setSelectedOperador(newValue)}
                        renderInput={(params) => <TextField {...params} placeholder="Selecione o Operador" size="small" />}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} md={5}>
                <FormLabel sx={{ mb: '8px', fontWeight: 600 }} component="legend">Filtrar por Status:</FormLabel>
                    <FormControl component="fieldset" sx={{width: '100%'}}>
                        <RadioGroup
                            aria-label="status"
                            name="status-filter"
                            value={selectedStatus}
                            onChange={(event, newValue) => setSelectedStatus(newValue)}
                        >
                            <Grid container spacing={0}>
                                <Grid item xs={12} md={7} display="flex" flexDirection="column">
                                    <FormControlLabel value="Todas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Todas" />
                                    <FormControlLabel value="Confirmadas/Pagas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Confirmadas/Pagas" />
                                    <FormControlLabel  value="Sem confirmação de pagamento" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Sem confirmação de pagamento" />
                                    <FormControlLabel value="Canceladas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Canceladas" />
                                </Grid>
                                <Grid item xs={12} md={5} display="flex" flexDirection="column">
                                    <FormControlLabel value="Separadas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Separadas" />
                                    <FormControlLabel value="Não Separadas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Não Separadas" />
                                    <FormControlLabel value="Não confirmadas" control={<Radio sx={{ pb: '2px', pt: '2px' }} />} label="Não Entregues" />
                                </Grid>
                            </Grid>
                        </RadioGroup>
                    </FormControl>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    onClick={applyFilters}
                    color="primary"
                    endIcon={<SearchIcon />}
                >
                    Pesquisar
                </Button>
            </Grid>
        </Grid>
    );
};

export default FiltroVendas;
