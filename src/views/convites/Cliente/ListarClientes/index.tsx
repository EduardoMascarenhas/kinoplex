import * as React from 'react';

// material-ui
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

// project-imports
import FiltroCliente from './FiltroCliente';
import DrawerCliente from './DrawerCliente';
import TabelaCliente from './TabelaCliente';
import MainCard from 'ui-component/cards/MainCard';

import { dispatch, useSelector } from 'store';
import { getDetailCards } from 'store/slices/user';

// types
import { UserProfile } from 'types/user-profile';

// ==============================|| CLIENT LIST ||============================== //

const ListarClientes = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [users, setUsers] = React.useState<UserProfile[]>([]);

    const { detailCards } = useSelector((state) => state.user);
    const [rowValue, setRowValue] = React.useState<UserProfile | null>(null);

    React.useEffect(() => {
        setUsers(detailCards);
    }, [detailCards]);

    React.useEffect(() => {
        dispatch(getDetailCards());
    }, []);

    return (
        <MainCard content={false}>
            {/* filter section */}
            <CardContent>
                <FiltroCliente {...{ users: detailCards, setUsers }} />
            </CardContent>

            {/* table */}
            <Box display={open ? 'flex' : 'block'}>
                <Grid container sx={{ position: 'relative' }}>
                    <Grid item sm={open ? 5 : 12} xs={12}>
                        <TabelaCliente open={open} setOpen={setOpen} users={users} setRowValue={setRowValue} />
                    </Grid>
                    <Grid item sm={open ? 7 : 12} xs={12} sx={{ borderLeft: '1px solid', borderLeftColor: 'divider' }}>
                        <DrawerCliente open={open} setOpen={setOpen} rowValue={rowValue!} />
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    );
};

export default ListarClientes;
