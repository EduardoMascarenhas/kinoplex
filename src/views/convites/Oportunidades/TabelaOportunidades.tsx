import * as React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// types
import { ArrangementOrder, KeyedObject, GetComparator } from 'types';
import { Invoice } from 'types/invoice';
import CabecalhoTabelaOportunidades from './CabecalhoTabelaOportunidades';

// table sort
function descendingComparator(a: KeyedObject, b: KeyedObject, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator: GetComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array: Invoice[], comparator: (a: Invoice, b: Invoice) => number) {
    const stabilizedThis = array.map((el: Invoice, index: number) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0] as Invoice, b[0] as Invoice);
        if (order !== 0) return order;
        return (a[1] as number) - (b[1] as number);
    });
    return stabilizedThis.map((el) => el[0]);
}

interface TextoLimitadoProps {
    texto: string;
    limite: number;
}
export const TextoLimitado: React.FC<TextoLimitadoProps> = ({ texto, limite }) => {
    const textoLimitado = texto.length > limite ? `${texto.substring(0, limite)}...` : texto;

    return <Typography variant="body1">{textoLimitado}</Typography>;
};

// ==============================|| INVOICE LIST - TABLE ||============================== //

const TabelaOportunidades = ({ rows }: { rows: Invoice[] }) => {
    const theme = useTheme();

    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

    let label: string;
    let color;
    let chipcolor;

    const handleRequestSort = (event: React.SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.customer_name);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleCheckBox = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <MainCard content={false}>
            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <CabecalhoTabelaOportunidades
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;

                                const isItemSelected = isSelected(row.customer_name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                switch (row.status.toString()) {
                                    case 'Paid':
                                        label = 'Paid';
                                        color = 'success.dark';
                                        chipcolor = alpha(theme.palette.success.light, 0.6);
                                        break;
                                    case 'Cancelled':
                                        label = 'Cancelled';
                                        color = 'orange.dark';
                                        chipcolor = alpha(theme.palette.orange.light, 0.8);
                                        break;
                                    case 'Unpaid':
                                    default:
                                        label = 'Unpaid';
                                        color = 'warning.dark';
                                        chipcolor = 'warning.light';
                                        break;
                                }

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell>{row.date} - 10:50 00:53</TableCell>
                                        <TableCell>
                                            <Stack>
                                                <Tooltip title="LABORATORIO DE ANALISES CLINICAS DR. ROBERTO FRANCO DO AMARAL LTDA">
                                                    <span>
                                                        <TextoLimitado
                                                            texto="LABORATORIO DE ANALISES CLINICAS DR. ROBERTO FRANCO DO AMARAL LTDA"
                                                            limite={50}
                                                        />
                                                    </span>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" alignItems="center" spacing={1} justifyContent="left">
                                                <Tooltip title="1200 Eletrônicos + 1800 Impressos">
                                                    <Typography variant="body1">3000</Typography>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>R$ {18}.000,00</TableCell>
                                        <TableCell sx={{ pr: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} justifyContent="right">
                                                <Tooltip title="Ver Detalhes">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={'/oportunidade/detalhes'}
                                                        size="small"
                                                        aria-label="Ver Detalhes"
                                                    >
                                                        <VisibilityTwoToneIcon
                                                            sx={{ fontSize: '1.3rem' }}
                                                            className="actions-icon-detalhes"
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow sx={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={10} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default TabelaOportunidades;
