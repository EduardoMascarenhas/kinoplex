import React, { useState } from 'react';
// material-ui
import { Grid, TableContainer, Table, TableHead, TableBody, TableRow, Paper, Button, TextField, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

// Function to create a new row
function createData(loteAno: string, nInicial: string, nFinal: string, dataValidade: string) {
    return { loteAno, nInicial, nFinal, dataValidade };
}

const initialRows = [
    createData('01/2023', '1', '101', '31/01/2024'),
    createData('02/2023', '301', '501', '31/01/2024'),
    createData('03/2023', '901', '1001', '31/01/2024'),
    createData('04/2023', '1101', '1201', '31/01/2024'),
    createData('05/2023', '50', '60', '31/01/2024')
];

export interface AllDataType {
    printName?: string;
}

const SerieNumeracao = ({ categoria }: { categoria: string }) => {
    const [rows, setRows] = useState(initialRows);

    // Function to handle input change for a particular row
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [field]: event.target.value
        };
        setRows(updatedRows);
    };

    // Function to add a new empty row
    const handleAddRow = () => {
        setRows([...rows, createData('', '', '', '')]);
    };

    // Function to remove a row
    const handleRemoveRow = (index: number) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    // Check if all fields in the last row are filled
    const isLastRowFilled = () => {
        if (rows.length === 0) return true; // Allow adding a row if there are no rows
        const lastRow = rows[rows.length - 1];
        return Object.values(lastRow).every((value) => value !== '');
    };

    return (
        <Grid container gap={2}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Lote/Ano - Série</StyledTableCell>
                            <StyledTableCell align="left">Nº Inicial</StyledTableCell>
                            <StyledTableCell align="left">Nº Final</StyledTableCell>
                            <StyledTableCell align="left">Data de Validade</StyledTableCell>
                            <StyledTableCell align="center">Ações</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">
                                    <TextField
                                        value={row.loteAno}
                                        onChange={(e: any) => handleInputChange(e, index, 'loteAno')}
                                        variant="outlined"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <TextField
                                        value={row.nInicial}
                                        onChange={(e: any) => handleInputChange(e, index, 'nInicial')}
                                        variant="outlined"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <TextField
                                        value={row.nFinal}
                                        onChange={(e: any) => handleInputChange(e, index, 'nFinal')}
                                        variant="outlined"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <TextField
                                        value={row.dataValidade}
                                        onChange={(e: any) => handleInputChange(e, index, 'dataValidade')}
                                        variant="outlined"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <IconButton onClick={() => handleRemoveRow(index)} aria-label="delete">
                                        <DeleteTwoToneIcon color="secondary" />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                onClick={handleAddRow}
                sx={{ mt: 2 }}
                disabled={!isLastRowFilled()} // Disable button if the last row is not filled
            >
                Adicionar Nova Linha
            </Button>
        </Grid>
    );
};

export default SerieNumeracao;
