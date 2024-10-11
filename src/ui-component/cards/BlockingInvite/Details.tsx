import React, { useState } from 'react';

// material-ui
import {
    Button,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TableRow,
    TableContainer,
    TableHead,
    Paper,
    Table,
    TableBody,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

// project imports
import { gridSpacing } from 'store/constant';

// types
import SubCard from '../SubCard';
import { styled } from '@mui/material/styles';

// styles
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

function createData(codigo: string, status: string, mensagem: string) {
    return { codigo, status, mensagem };
}

const rows = [
    createData('asdfe', 'PROCESSANDO', 'Processando código asdfe'),
    createData('asdfe', 'BLOQUEADO', 'Código asdfe bloqueado com sucesso!'),
    createData('1234', 'PROCESSANDO', 'Processando código 1234'),
    createData('1234', 'BLOQUEADO', 'Código 1234 bloqueado com sucesso!')
];
// table data

const IBlockingDetails = () => {
    const [selectedType, setSelectedType] = useState('IMPRESSO');
    const [openBlock, setOpenBlock] = React.useState(false);
    const [openUnblock, setOpenUnblock] = React.useState(false);

    const handleSelectedTypeChange = (event: any) => {
        setSelectedType(event.target.value);
    };

    const handleClickOpenBlock = () => {
        setOpenBlock(true);
    };

    const handleCloseBlock = () => {
        setOpenBlock(false);
    };

    const handleClickOpenUnblock = () => {
        setOpenUnblock(true);
    };

    const handleCloseUnblock = () => {
        setOpenUnblock(false);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <FormControl sx={{ minWidth: 250 }}>
                                <InputLabel id="status-filter-label">Tipo de Convite</InputLabel>
                                <Select
                                    labelId="status-filter-label"
                                    id="status-filter"
                                    value={selectedType}
                                    label="Filtrar por tipo de Convite"
                                    onChange={handleSelectedTypeChange}
                                >
                                    <MenuItem value="IMPRESSO">Impresso</MenuItem>
                                    <MenuItem value="ELETRONICO">Eletrônico</MenuItem>
                                    <MenuItem value="AMBOS">Ambos Impresso e Eletrônico</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TextField
                                id="filled-multiline-flexible"
                                label="Lista de Lotes"
                                multiline
                                variant="filled"
                                sx={{ width: '100%' }}
                                minRows={20}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                            <Button
                                color="error"
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{ mr: '15px' }}
                                startIcon={<LockTwoToneIcon />}
                                onClick={() => handleClickOpenBlock()}
                            >
                                Bloquear
                            </Button>
                            <Button
                                color="success"
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{ mr: '15px' }}
                                startIcon={<LockOpenTwoToneIcon />}
                                onClick={() => handleClickOpenUnblock()}
                            >
                                Desbloquear
                            </Button>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item xs={12}>
                <SubCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>CÓDIGO</StyledTableCell>
                                            <StyledTableCell align="left">STATUS</StyledTableCell>
                                            <StyledTableCell align="left">MENSAGEM</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.codigo}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.codigo}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{row.status}</StyledTableCell>
                                                <StyledTableCell align="left">{row.mensagem}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Dialog
                open={openBlock}
                onClose={handleCloseBlock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Deseja Realmente Bloquear os Convites?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tipo de Convite selecionado:{' '}
                        <b>{`${selectedType === 'IMPRESSO' ? 'Impresso' : selectedType === 'ELETRONICO' ? 'Eletrônico' : 'Ambos Impresso e Eletrônico'}`}</b>
                    </DialogContentText>
                    <br />
                    <DialogContentText id="alert-dialog-description-2">
                        Ao clicar em "BLOQUEAR" o processo de bloqueio terá início.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBlock} color="secondary" variant="contained">
                        CANCELAR
                    </Button>
                    <Button onClick={() => console.log('BLOQUEAR')} color="error" variant="contained" startIcon={<LockTwoToneIcon />}>
                        BLOQUEAR
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openUnblock}
                onClose={handleCloseUnblock}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Deseja Realmente Desbloquear os Convites?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description-3">
                        Tipo de Convite selecionado:{' '}
                        <b>{`${selectedType === 'IMPRESSO' ? 'Impresso' : selectedType === 'ELETRONICO' ? 'Eletrônico' : 'Ambos Impresso e Eletrônico'}`}</b>
                    </DialogContentText>
                    <br />
                    <DialogContentText id="alert-dialog-description-4">
                        Ao clicar em "DESBLOQUEAR" o processo de desbloqueio terá início.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUnblock} color="secondary" variant="contained">
                        CANCELAR
                    </Button>
                    <Button
                        onClick={() => console.log('DESBLOQUEAR')}
                        color="success"
                        variant="contained"
                        startIcon={<LockOpenTwoToneIcon />}
                    >
                        DESBLOQUEAR
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default IBlockingDetails;
