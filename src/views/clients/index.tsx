import Clients from 'ui-component/cards/Clients';
import MainCardClients from 'ui-component/cards/MainCardClients';

function ClientList() {
    return (
        <MainCardClients title="Clientes">
            <Clients />
        </MainCardClients>
    );
}

export default ClientList;
