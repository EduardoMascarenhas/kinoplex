// material-ui
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// assets
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// types
import { ConviteItems } from 'types/convite';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-of-type td, &:last-of-type th': {
        border: 0,
    },
    'td': {
        padding: '6px 16px'
    }
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#e3f2fd",
        color: '#383838',
        fontSize: 16,
        padding: '8px 16px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
}));

interface ConviteDataProps {
    convitesData: ConviteItems[];
    deleteConviteHandler: (row: number) => void;
}

const formatCurrency = (value: any) => {
    if (typeof value === 'string') {
        value = value.replace('.', '').replace(',', '.');
    }
    const number = parseFloat(value);
    if (isNaN(number)) {
        return 'R$ 0,00';
    }
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// ==============================|| CREATE INVOICE - ITEMS ||============================== //

function ListaItemEletronico({ convitesData, deleteConviteHandler }: ConviteDataProps) {

    return (
        <Table sx={{ minWidth: 320, border: '1px solid #697586' }} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Convite Eletrônico</StyledTableCell>
                    <StyledTableCell align="right">Quantidade</StyledTableCell>
                    <StyledTableCell align="right">Preço unitário</StyledTableCell>
                    <StyledTableCell align="right">Total</StyledTableCell>
                    <StyledTableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {convitesData.map((row, index) => (
                    <StyledTableRow hover key={index}>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell align="right">{row.quantidade}</TableCell>
                        <TableCell align="right">{formatCurrency(row.preco_unitario)}</TableCell>
                        <TableCell align="right">{formatCurrency(row.total)}</TableCell>
                        <TableCell sx={{ pr: 1 }} align="right">
                            <IconButton color="error" size="small" onClick={() => deleteConviteHandler(row.id!)}>
                                <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                        </TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ListaItemEletronico;
