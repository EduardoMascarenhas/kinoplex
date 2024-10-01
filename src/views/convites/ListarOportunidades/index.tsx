import MainCardInvitations from 'ui-component/cards/MainCardInvitations';
import Opportunity from 'ui-component/cards/Opportunity';

// ==============================|| INVOICE LIST ||============================== //

const ListarOportunidades = () => {
    return (
        <MainCardInvitations title="Oportunidades">
            <Opportunity />
        </MainCardInvitations>
    );
};

export default ListarOportunidades;
