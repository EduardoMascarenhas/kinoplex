import React, { ReactNode } from 'react';
// material-ui
import { Typography, Grid, Tooltip, Box } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';

// types
import { EventDataType } from 'types/event';

interface SubCardCustomProps {
    allData: EventDataType;
    children: ReactNode; // define children como um tipo ReactNode para passar JSX
}

const SubCardCustom = ({ allData, children }: SubCardCustomProps) => {
    return (
        <SubCard
            title={
                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Typography variant="h5">Evento:</Typography>
                    <Typography variant="body2">{`${allData.id}`}</Typography>
                </Box>
            }
            secondary={
                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Typography variant="h5">Status do Evento:</Typography>
                        <Chip
                            label={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'Confirmado Aguardando Pagamento' : allData.dadosDoEvento.status === 'PAGO' ? 'Pago' : allData.dadosDoEvento.status === 'CANCELADO' ? 'Cancelado' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'Confirmado' : 'ERRO') : 'NULL'}`}
                            variant="outlined"
                            size="small"
                            chipcolor={`${allData?.dadosDoEvento?.status ? (allData.dadosDoEvento.status === 'CONFIRMADO_AGUARDANDO_PAGAMENTO' ? 'secondary' : allData.dadosDoEvento.status === 'PAGO' ? 'success' : allData.dadosDoEvento.status === 'CANCELADO' ? 'error' : allData.dadosDoEvento.status === 'CONFIRMADO' ? 'primary' : 'error') : 'error'}`}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <Typography variant="h5">Data de Criação do Evento:</Typography>
                        <Typography variant="body2">{`${allData?.createdAt}`}</Typography>
                    </Box>
                </Box>
            }
        >
            {children} {/* Aqui estamos renderizando o children */}
        </SubCard>
    );
};

export default SubCardCustom;
