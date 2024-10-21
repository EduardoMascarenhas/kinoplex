import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Oportunidades from 'views/convites/Oportunidades';
import CriarOportunidades from 'views/convites/CriarOportunidades';
import NotFound from 'views/NotFound';
import OportunidadeFaturamento from 'views/convites/Oportunidades/Faturamento';
import ConviteFaturamento from 'views/convites/Faturamento';
import EventoFaturamento from 'views/events/Faturamento';
import AuthGuard from 'utils/route-guard/AuthGuard';

// Convites
const DetalheOportunidade = Loadable(lazy(() => import('views/convites/Oportunidades/DetalheOportunidade')));
const AdicionarCliente = Loadable(lazy(() => import('views/convites/Cliente/AdicionarCliente')));
const AdicionarVenda = Loadable(lazy(() => import('views/convites/Vendas/AdicionarVenda')));
const ListarClientes = Loadable(lazy(() => import('views/convites/Cliente/ListarClientes')));
const Vendas = Loadable(lazy(() => import('views/convites/Vendas')));

const InvitationsInvites = Loadable(lazy(() => import('views/invitations/Invites')));
const InviteSeparation = Loadable(lazy(() => import('views/invitations/Invites/separation')));
const InvitationBlocking = Loadable(lazy(() => import('views/invitations/Invites/blocking')));
const EventList = Loadable(lazy(() => import('views/events')));
const ClientList = Loadable(lazy(() => import('views/clients')));
const ConvitesLotesList = Loadable(lazy(() => import('views/convites-lotes')));
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
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/oportunidade/novo',
            element: <CriarOportunidades />
        },
        {
            path: '/oportunidade/faturamento',
            element: <OportunidadeFaturamento />
        },
        {
            path: '/oportunidades',
            element: <Oportunidades />
        },
        {
            path: '/oportunidade/detalhe/:id',
            element: <DetalheOportunidade />
        },
        {
            path: '/convites',
            element: <InvitationsInvites />
        },
        {
            path: '/convite/faturamento',
            element: <ConviteFaturamento />
        },
        {
            path: '/convites/venda/:id',
            element: <AdicionarVenda />
        },
        {
            path: '/convite/separacao/:id',
            element: <InviteSeparation />
        },
        {
            path: '/convite/bloqueio',
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
            path: '/evento/faturamento',
            element: <EventoFaturamento />
        },
        {
            path: '/convite/clientes',
            element: <ListarClientes />
        },
        {
            path: '/convites/vendas',
            element: <Vendas />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
