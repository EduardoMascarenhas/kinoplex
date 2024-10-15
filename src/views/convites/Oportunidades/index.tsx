import { useEffect, useState } from 'react';

// material-ui
import CardContent from '@mui/material/CardContent';

// project imports
import FiltrarOportunidades from './FiltrarOportunidades';
import TabelaOportunidades from './TabelaOportunidades';

import { dispatch, useSelector } from 'store';
import { getInvoice } from 'store/slices/customer';
import opportunities from 'api/opportunities.json';

// types
import MainCardInvitations from 'ui-component/cards/MainCardInvitations';
import { Oportunidade } from 'types/oportunidade';

// ==============================|| INVOICE LIST ||============================== //

const Oportunidades = () => {

    const [rows, setRows] = useState<Oportunidade[]>([]);

    useEffect(() => {
        const fetchedClients = opportunities.opportunities as unknown as Oportunidade[]; // Assegurando que o tipo está correto
        setRows(fetchedClients);
    }, []);

    return (
        <MainCardInvitations title="Lista de Oportunidade">
            {/* filter section */}
            <CardContent sx={{paddingTop: 0}}>
                <FiltrarOportunidades {...{ rows, setRows }} />
            </CardContent>

            {/* table */}
            <TabelaOportunidades {...{ rows }} />
        </MainCardInvitations>
    );
};

export default Oportunidades;
