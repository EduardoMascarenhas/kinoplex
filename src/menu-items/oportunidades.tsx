// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconBasket } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics,
    IconBasket: IconBasket
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const oportunidades: NavItemType = {
    id: 'oportunidades',
    title: <FormattedMessage id="oportunidades" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'opportunities-list',
            title: <FormattedMessage id="opportunities-list" />,
            type: 'item',
            url: '/convites/listar-oportunidades',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'create-opportunities',
            title: <FormattedMessage id="create-opportunities" />,
            type: 'item',
            url: '/convites/criar-oportunidades',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default oportunidades;
