import * as React from 'react';

// material-ui
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// types
import { ArrangementOrder, HeadCell, EnhancedTableToolbarProps } from 'types';

// table header options
const headCells: HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        label: 'ID'
    },
    {
        id: 'nome',
        numeric: true,
        label: 'Cliente',
        align: 'left'
    },
    {
        id: 'data',
        numeric: false,
        label: 'Data Venda'
    },
    {
        id: 'cinema',
        numeric: true,
        label: 'Cinema'
    },

    {
        id: 'quantidade',
        numeric: true,
        label: 'Quantidade',
    },
    {
        id: 'valor',
        numeric: true,
        label: 'Valor',
    },
    {
        id: 'pagamento',
        numeric: true,
        label: 'Pagamento',
        align: 'center'
    },
    {
        id: 'separacao',
        numeric: true,
        label: 'Separação',
        align: 'center'
    },
    {
        id: 'entrega',
        numeric: true,
        label: 'Entrega',
        align: 'center'
    },
];

// ==============================|| INVOICE LIST - TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => (
    <Toolbar sx={{ p: 0, pl: 1, pr: 1, ...(numSelected > 0 && { color: 'secondary.main' }) }}>
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
    </Toolbar>
);

// ==============================|| INVOICE LIST - HEADER ||============================== //

interface ListTableHeaderProps {
    selected: string[];
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: ArrangementOrder;
    orderBy: string;
    numSelected: number;
    rowCount: number;
    onRequestSort: (event: React.SyntheticEvent<Element, Event>, property: string) => void;
}

const CabecalhoListarVendas = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected }: ListTableHeaderProps) => {
    const createSortHandler = (property: string) => (event: React.SyntheticEvent<Element, Event>) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={12}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell, index) => {
                        const isActive = orderBy === headCell.id;
                        return (
                            <TableCell
                                key={index}
                                align={headCell.align}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={isActive ? order : undefined}
                            >
                                <TableSortLabel
                                    active={isActive}
                                    direction={isActive ? order : undefined}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {isActive && (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    )}
                                </TableSortLabel>
                            </TableCell>
                        );
                    })}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        Ações
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default CabecalhoListarVendas;
