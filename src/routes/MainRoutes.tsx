import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Oportunidades from 'views/convites/Oportunidades';
import CriarOportunidades from 'views/convites/CriarOportunidades';
import NotFound from 'views/NotFound';

// Convites
const DetalheOportunidade = Loadable(lazy(() => import('views/convites/DetalheOportunidade')));
const AdicionarCliente = Loadable(lazy(() => import('views/convites/Cliente/AdicionarCliente')));
const ListarVendas = Loadable(lazy(() => import('views/convites/ListarVendas')));
const ListarClientes = Loadable(lazy(() => import('views/convites/Cliente/ListarClientes')));
const InvitationsInvites = Loadable(lazy(() => import('views/invitations/Invites')));
const CreateInvitation = Loadable(lazy(() => import('views/invitations/Invites/create')));
const InviteSeparation = Loadable(lazy(() => import('views/invitations/Invites/separation')));
const InvitationBlocking = Loadable(lazy(() => import('views/invitations/Invites/blocking')));
const EventList = Loadable(lazy(() => import('views/events')));
const ClientList = Loadable(lazy(() => import('views/clients')));
const ClientEdit = Loadable(lazy(() => import('views/client-edit')));
const ClientDetail = Loadable(lazy(() => import('views/client-detail')));
const EventDetails = Loadable(lazy(() => import('views/event')));
const EventEdit = Loadable(lazy(() => import('views/event-edit')));
const EventNew = Loadable(lazy(() => import('views/event-new')));
// ==============================|| MAIN ROUTING ||============================== //

/*
    <AuthGuard>
        <MainLayout />
    </AuthGuard>
*/
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/oportunidade/novo',
            element: <CriarOportunidades />
        },
        {
            path: '/oportunidades',
            element: <Oportunidades />
        },
        {
            path: '/oportunidade/detalhes',
            element: <DetalheOportunidade />
        },
        {
            path: '/convites',
            element: <InvitationsInvites />
        },
        {
            path: '/convites/novo',
            element: <CreateInvitation />
        },
        {
            path: '/convite/separacao/:id',
            element: <InviteSeparation />
        },
        {
            path: '/convites/bloqueio',
            element: <InvitationBlocking />
        },
        {
            path: '/clientes',
            element: <ClientList />
        },
        {
            path: '/cliente/novo',
            element: <AdicionarCliente />
        },
        {
            path: '/cliente/detalhes/:id',
            element: <ClientDetail />
        },
        {
            path: '/cliente/editar/:id',
            element: <ClientEdit />
        },
        {
            path: '/eventos',
            element: <EventList />
        },
        {
            path: '/evento/detalhes/:id',
            element: <EventDetails />
        },
        {
            path: '/evento/editar/:id',
            element: <EventEdit />
        },
        {
            path: '/evento/novo',
            element: <EventNew />
        },
        {
            path: '/convite/clientes',
            element: <ListarClientes />
        },
        {
            path: '/convites/vendas',
            element: <ListarVendas />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
