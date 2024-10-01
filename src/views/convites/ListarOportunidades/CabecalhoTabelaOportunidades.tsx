import * as React from 'react';

// material-ui
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
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
        id: 'date',
        numeric: true,
        label: 'Data da Criação'
    },
    {
        id: 'name',
        numeric: false,
        label: 'Cliente'
    },
    {
        id: 'quantidade',
        numeric: false,
        label: 'Quantidade Total'
    },
    {
        id: 'amount',
        numeric: true,
        label: 'Valor Total',
    }
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
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: ArrangementOrder;
    orderBy: string;
    numSelected: number;
    rowCount: number;
    onRequestSort: (event: React.SyntheticEvent<Element, Event>, property: string) => void;
}

const CabecalhoTabelaOportunidades = ({ order, orderBy, numSelected, onRequestSort, selected }: ListTableHeaderProps) => {
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
                    <TableCell sortDirection={false} align="center" sx={{ pr: 0 }}>
                        Ação
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

export default CabecalhoTabelaOportunidades;
