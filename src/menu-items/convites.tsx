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
            id: 'opportunities',
            title: <FormattedMessage id="opportunities" />,
            type: 'item',
            url: '/convites/oportunidades',
            icon: icons.IconDashboard,
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
            id: 'sales-list',
            title: <FormattedMessage id="sales-list" />,
            type: 'item',
            url: '/convites/listar-vendas',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default convites;
