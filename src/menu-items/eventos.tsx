// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconCalendarEvent } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    IconCalendarEvent: IconCalendarEvent
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const eventos: NavItemType = {
    id: 'eventos',
    title: <FormattedMessage id="eventos" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'convites-list',
            title: <FormattedMessage id="event-list" />,
            type: 'item',
            url: '/eventos',
            icon: icons.IconCalendarEvent,
            breadcrumbs: false
        }
    ]
};

export default eventos;
