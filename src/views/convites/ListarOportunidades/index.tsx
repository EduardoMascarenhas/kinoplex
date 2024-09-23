import { useEffect, useState } from 'react';

// material-ui
import CardContent from '@mui/material/CardContent';

// project imports
import FiltrarOportunidades from './FiltrarOportunidades';
import TabelaOportunidades from './TabelaOportunidades';

import { dispatch, useSelector } from 'store';
import { getInvoice } from 'store/slices/customer';

// types
import { Invoice } from 'types/invoice';
import MainCardInvitations from 'ui-component/cards/MainCardInvitations';

// ==============================|| INVOICE LIST ||============================== //

const ListarOportunidades = () => {
    const { invoices } = useSelector((state) => state.customer);

    const [rows, setRows] = useState<Invoice[]>([]);

    useEffect(() => {
        dispatch(getInvoice());
    }, []);

    useEffect(() => {
        setRows(invoices);
    }, [invoices]);

    return (
        <MainCardInvitations title="Lista de Oportunidade">
            {/* filter section */}
            <CardContent sx={{paddingTop: 0}}>
                <FiltrarOportunidades {...{ rows: invoices, setRows }} />
            </CardContent>

            {/* table */}
            <TabelaOportunidades {...{ rows }} />
        </MainCardInvitations>
    );
};

export default ListarOportunidades;
