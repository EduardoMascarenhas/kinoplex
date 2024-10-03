// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconTicket } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    IconTicket: IconTicket
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const convites: NavItemType = {
    id: 'convites',
    title: <FormattedMessage id="convites" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'convites-list',
            title: <FormattedMessage id="invite-list" />,
            type: 'item',
            url: '/convites',
            icon: icons.IconTicket,
            breadcrumbs: false
        }
    ]
};

export default convites;
