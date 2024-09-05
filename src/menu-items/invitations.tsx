// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics: IconDeviceAnalytics
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const invitations: NavItemType = {
    id: 'invitations',
    title: <FormattedMessage id="invitations" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/invitations/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'opportunities',
            title: <FormattedMessage id="opportunities" />,
            type: 'item',
            url: '/invitations/create-opportunities',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'sales',
            title: <FormattedMessage id="sales" />,
            type: 'item',
            url: '/invitations/sales',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        },
        {
            id: 'types',
            title: <FormattedMessage id="types" />,
            type: 'item',
            url: '/invitations/types',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default invitations;
