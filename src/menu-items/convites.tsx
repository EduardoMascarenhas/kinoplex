// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconBasket, } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconBasket: IconBasket
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const convites: NavItemType = {
    id: 'convites',
    title: <FormattedMessage id="convites" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/convites/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'create-opportunities',
            title: <FormattedMessage id="create-opportunities" />,
            type: 'item',
            url: '/convites/criar-oportunidades',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'opportunities-list',
            title: <FormattedMessage id="opportunities-list" />,
            type: 'item',
            url: '/convites/listar-oportunidades',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'opportunitie-detail',
            title: <FormattedMessage id="opportunitie-detail" />,
            type: 'item',
            url: '/convites/detalhe-oportunidade',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'client',
            title: <FormattedMessage id="client" />,
            type: 'collapse',
            icon: icons.IconBasket,
            children: [
                {
                    id: 'add-client',
                    title: <FormattedMessage id="add-client" />,
                    type: 'item',
                    url: '/convites/cliente/adicionar-cliente'
                },
                {
                    id: 'client-list',
                    title: <FormattedMessage id="client-list" />,
                    type: 'item',
                    url: '/convites/cliente/listar-clientes'
                }
            ]
        },
        {
            id: 'types',
            title: <FormattedMessage id="types" />,
            type: 'item',
            url: '/convites/types',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default convites;