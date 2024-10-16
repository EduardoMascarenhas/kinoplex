import { useEffect, useState } from 'react';

// material-ui
import CardContent from '@mui/material/CardContent';

// project imports
import FiltroVendas from './FiltroVendas';
import TabelaVendas from './TabelaVendas';

import { dispatch, useSelector } from 'store';
import { getInvoice } from 'store/slices/customer';

// types
import { Invoice } from 'types/invoice';
import MainCardInvitations from 'ui-component/cards/MainCardInvitations';

import vendas from 'api/vendas.json'; // Importando o JSON local

// ==============================|| INVOICE LIST ||============================== //

const Vendas = () => {
    const { invoices } = useSelector((state) => state.customer);

    const [rows, setRows] = useState<Invoice[]>([]);

    useEffect(() => {
        dispatch(getInvoice());
    }, []);

    // Simulando o carregamento de dados do JSON
    useEffect(() => {
        const fetchedVendas = vendas.vendas as unknown as Invoice[]; // Assegurando que o tipo está correto
        setRows(fetchedVendas);
    }, []);

    return (
        <MainCardInvitations title="Lista de Vendas">
            {/* filter section */}
            <CardContent sx={{ paddingTop: 0 }}>
                <FiltroVendas {...{ rows: invoices, setRows }} />
            </CardContent>

            {/* table */}
            <TabelaVendas {...{ rows }} />
        </MainCardInvitations>
    );
};

export default Vendas;
