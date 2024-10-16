import React, { useState } from 'react';
// material-ui
import { Grid, TableContainer, Table, TableHead, TableBody, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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

function createData(loteAno: string, nInicial: string, nFinal: string, dataValidade: string) {
    return { loteAno, nInicial, nFinal, dataValidade };
}

const rows = [
    createData('01/2023', '1', '101', '31/01/2024'),
    createData('02/2023', '301', '501', '31/01/2024'),
    createData('03/2023', '901', '1001', '31/01/2024'),
    createData('04/2023', '	1101', '1201', '31/01/2024'),
    createData('05/2023', '50', '60', '31/01/2024')
];

export interface AllDataType {
    printName?: string;
}

const SerieNumeracoesAnteriores = ({ categoria }: { categoria: string }) => {
    const [allData, setAllData] = useState<AllDataType>({
        printName: ''
    });

    const handleChangeData = (event: any, name: string) => {
        setAllData({ ...allData, [name]: event.target.value });
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.loteAno}>
                                <StyledTableCell component="th" scope="row" align="left">
                                    {row.loteAno}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.nInicial}</StyledTableCell>
                                <StyledTableCell align="left">{row.nFinal}</StyledTableCell>
                                <StyledTableCell align="left">{row.dataValidade}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default SerieNumeracoesAnteriores;
