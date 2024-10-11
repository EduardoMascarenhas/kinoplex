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
import CommitIcon from '@mui/icons-material/Commit';
import DownloadIcon from '@mui/icons-material/Download';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import EditIcon from '@mui/icons-material/Edit';

// Reserva
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Pagamento
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Separação
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

// Entrega
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// types
import { ArrangementOrder, KeyedObject, GetComparator } from 'types';
import { Invoice } from 'types/invoice';
import CabecalhoTabelaVendas from './CabecalhoTabelaVendas';
import Dialog from '@mui/material/Dialog';
import { ChangeEvent, SyntheticEvent, useState, FC } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';

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

// ==============================|| Sell LIST - TABLE ||============================== //

const TextoLimitado = ({ texto, limite }: { texto: string | undefined; limite: number }) => {
    if (!texto || texto.length === 0) {
        return null; // ou outro fallback que faça sentido
    }

    const textoFormatado = texto.length > limite ? texto.substring(0, limite) + '...' : texto;

    return <span>{textoFormatado}</span>;
};

const getStatusPagamento = (status: string) => {
    switch (status) {
        case 'Confirmado':
            return <PaidIcon color="success" />;
        case 'Pendente':
            return <CurrencyExchangeIcon color="warning" />;
        case 'Cancelado':
            return <MoneyOffIcon color="error" />;
        case 'Não confirmado':
            return <AttachMoneyIcon color="disabled" />;
        default:
            return <AttachMoneyIcon color="disabled" />;
    }
};

const getStatusSeparacao = (status: string) => {
    switch (status) {
        case 'Confirmado':
            return <Inventory2Icon color="success" />;
        case 'Pendente':
            return <Inventory2Icon color="warning" />;
        case 'Cancelado':
            return <DoDisturbIcon color="error" />;
        case 'Não confirmado':
            return <Inventory2Icon color="disabled" />;
        default:
            return <Inventory2Icon color="disabled" />;
    }
};

const getStatusEntrega = (status: string) => {
    switch (status) {
        case 'Confirmado':
            return <LocalShippingIcon color="success" />;
        case 'Pendente':
            return <LocalShippingIcon color="warning" />;
        case 'Cancelado':
            return <DoDisturbIcon color="error" />;
        case 'Não confirmado':
            return <LocalShippingIcon color="disabled" />;
        default:
            return <LocalShippingIcon color="disabled" />;
    }
};

const TabelaVendas = ({ rows }: { rows: Invoice[] }) => {
    const theme = useTheme();

    const [order, setOrder] = useState<ArrangementOrder>('asc');
    const [orderBy, setOrderBy] = useState<string>('calories');
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedRow, setSelectedRow] = useState<Invoice | null>(null);

    const handleDialogToggler = (row: Invoice) => {
        setSelectedRow(row);
        setOpen(!open);
    };

    // Funções para manuseio do envio e download
    const handleEmailSend = () => {
        if (selectedRow) {
            // Lógica para enviar email
            console.log(`Enviando email para ${selectedRow.customer_name}...`);
            handleClose();
        }
    };

    const handleDownload = () => {
        if (selectedRow) {
            // Lógica para download
            console.log(`Baixando fatura de ${selectedRow.customer_name}...`);
            handleClose();
        }
    };

    const handleRequestSort = (event: SyntheticEvent<Element, Event>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        event?.target.value && setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleClose = () => {
        setOpen(false);
    };
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

                                return (
                                    <TableRow
                                        hover
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >

                                        <TableCell>{row.invoice_id}</TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            <Tooltip title={row.customer_name}>
                                                <span>
                                                    <TextoLimitado texto={row.customer_name} limite={15} />
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.date}</TableCell>

                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                            <Tooltip title={row.cinema}>
                                                <span>
                                                    <TextoLimitado texto={row.cinema} limite={15} />
                                                </span>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell >
                                            <Tooltip title={`${row.impresso} impressos + ${row.eletronico} eletrônicos`}>
                                                <span>{row.quantity}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>R$ {row.price_total}</TableCell>

                                        <TableCell align="left">
                                            <Tooltip title={`Pagamento ${row.pagamento}`}>
                                                <span>{getStatusPagamento(row.pagamento)}</span>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell align="left">
                                            <Tooltip title={`Separação ${row.separacao}`}>
                                                <span>{getStatusSeparacao(row.separacao)}</span>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell align="left">
                                            <Tooltip title={`Entrega ${row.entrega}`}>
                                                <span>{getStatusEntrega(row.entrega)}</span>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                                                <Tooltip title="Clique se deseja enviar por email ou efetuar o download">
                                                    <IconButton onClick={() => handleDialogToggler(row)} size="small" aria-label="deseja enviar por email ou efetuar o download">
                                                        <DownloadIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Bloqueio de Convite">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={`#`}
                                                        size="small"
                                                        aria-label="Bloqueio de Convite"
                                                    >
                                                        <UnpublishedIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Vincular lote">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={'#'}
                                                        size="small"
                                                        aria-label="Vincular lote"
                                                    >
                                                        <CommitIcon sx={{ fontSize: '1.5rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Detalhe da Venda">
                                                    <IconButton
                                                        color="primary"
                                                        component={Link}
                                                        to={'#'}
                                                        size="small"
                                                        aria-label="Detalhe da Venda"
                                                    >
                                                        <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Editar venda">
                                                    <IconButton
                                                        color='primary'
                                                        component={Link}
                                                        to={`#`}
                                                        size="small"
                                                        aria-label="Edit"
                                                    >
                                                        <EditIcon sx={{ fontSize: '1.3rem' }} />
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

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Deseja enviar por e-mail ou efetuar o Download?"}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText>
                        {selectedRow?.email}
                        <Button sx={{ ml: '8px', mr: '8px' }} onClick={handleEmailSend} variant='outlined' color="primary">
                            Enviar
                        </Button>
                        ou
                        <Button sx={{ ml: '8px', mr: '8px' }} onClick={handleDownload} variant='outlined' color="primary">
                            Fazer Download
                        </Button>
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default TabelaVendas;
