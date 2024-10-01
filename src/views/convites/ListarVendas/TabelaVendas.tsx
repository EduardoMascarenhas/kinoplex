import * as React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
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

// third-party
import { random } from 'lodash-es';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BlockIcon from '@mui/icons-material/Block';
import LockIcon from '@mui/icons-material/Lock';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// types
import { ThemeMode } from 'types/config';
import { ArrangementOrder, KeyedObject, GetComparator } from 'types';
import { Invoice } from 'types/invoice';
import CabecalhoTabelaVendas from './CabecalhoTabelaVendas';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

// ==============================|| INVOICE LIST - TABLE ||============================== //

const TabelaVendas = ({ rows }: { rows: Invoice[] }) => {
    const theme = useTheme();

    const [order, setOrder] = React.useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('calories');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <CabecalhoTabelaVendas
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
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
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >

                                        <TableCell>{row.invoice_id}</TableCell>
                                        <TableCell>{row.customer_name}</TableCell>
                                        <TableCell>{row.date}</TableCell>

                                        <TableCell>{row.due_date}</TableCell>
                                        <TableCell >{row.quantity}</TableCell>

                                        <TableCell >R$ {random(1000, 9999)}</TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                                                <Tooltip title="Nota de Débito">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={'#'}
                                                        size="small"
                                                        aria-label="Nota de Débito"
                                                    >
                                                        <EventNoteIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Bloqueio de Convite">
                                                    <IconButton
                                                        color="error"
                                                        component={Link}
                                                        to={`#`}
                                                        size="small"
                                                        aria-label="Bloqueio de Convite"
                                                    >
                                                        <BlockIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="">
                                                    <>
                                                        <IconButton
                                                            id="demo-positioned-button"
                                                            size="small"
                                                            color='warning'
                                                            aria-label=""
                                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={handleClick}
                                                        >
                                                            <LockIcon sx={{ fontSize: '1.3rem' }} />
                                                        </IconButton>
                                                        <Menu
                                                            id="demo-positioned-menu"
                                                            aria-labelledby="demo-positioned-button"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <MenuItem onClick={handleClose}>Imprimir código de desbloqueio</MenuItem>
                                                            <MenuItem onClick={handleClose}>Desbloquear a venda</MenuItem>
                                                        </Menu>
                                                    </>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                                                <Tooltip title="Detalhamento da Venda">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={'#'}
                                                        size="small"
                                                        aria-label="Detalhamento da Venda"
                                                    >
                                                        <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Alterar Validade">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={`/apps/invoice/edit-invoice`}
                                                        size="small"
                                                        aria-label="Alterar Validade"
                                                    >
                                                        <EditCalendarIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Aprovar download">
                                                    <IconButton size="small" aria-label="Aprovar download">
                                                        <DownloadIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color='success'
                                                        component={Link}
                                                        to={`#`}
                                                        size="small"
                                                        aria-label="Edit"
                                                    >
                                                        <CheckCircleIcon sx={{ fontSize: '1.3rem' }} />
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

export default TabelaVendas;
