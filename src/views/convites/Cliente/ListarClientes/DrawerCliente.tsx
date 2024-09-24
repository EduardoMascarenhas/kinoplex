// material-ui
import { Theme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import DetalheCliente from './DetalheCliente';

// types
import { UserProfile } from 'types/user-profile';

interface DrawerClienteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    rowValue: UserProfile;
}

// ==============================|| CLIENT DETAILS - DRAWER ||============================== //

const DrawerCliente = ({ open, setOpen, rowValue }: DrawerClienteProps) => {
    const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                sx={{
                    flexShrink: 0,
                    zIndex: 100,
                    display: open ? 'block' : 'none',
                    '& .MuiDrawer-paper': {
                        position: 'relative',
                        ...(!downSM && open && { borderTop: '1px solid', borderTopColor: 'divider' }),
                        ...(downSM && {
                            position: 'absolute'
                        }),
                        overflow: 'unset',
                        width: '100%',
                        borderLeft: 'none'
                    }
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DetalheCliente rowValue={rowValue} handleDrawerClose={handleDrawerClose} />
            </Drawer>
        </>
    );
};

export default DrawerCliente;
