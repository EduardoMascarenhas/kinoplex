import React from 'react';

// material-ui
import {
    Button,
    Grid,
    TextField,
    Tabs,
    Tab,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

// project imports
import { gridSpacing } from 'store/constant';

// types
import SubCard from '../SubCard';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const IBlockingDetails = () => {
    const [openBlock, setOpenBlock] = React.useState(false);
    const [openUnblock, setOpenUnblock] = React.useState(false);

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={gridSpacing}>
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
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="CÓDIGO" {...a11yProps(0)} />
                                        <Tab label="STATUS" {...a11yProps(1)} />
                                        <Tab label="MENSAGEM" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0}>
                                    CÓDIGO
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    STATUS
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={2}>
                                    MENSAGEM
                                </CustomTabPanel>
                            </Box>
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
                    <DialogContentText id="alert-dialog-description">
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
