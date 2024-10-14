// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons-react';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import StadiumTwoToneIcon from '@mui/icons-material/StadiumTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    TipsAndUpdatesTwoToneIcon: TipsAndUpdatesTwoToneIcon,
    LocalActivityTwoToneIcon: LocalActivityTwoToneIcon,
    StadiumTwoToneIcon: StadiumTwoToneIcon,
    PeopleAltTwoToneIcon: PeopleAltTwoToneIcon,
    ListTwoToneIcon: ListTwoToneIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const eventos: NavItemType = {
    id: 'eventos',
    title: <FormattedMessage id="Evento" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'event-list',
            title: <FormattedMessage id="Eventos" />,
            type: 'collapse',
            icon: icons.StadiumTwoToneIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'event-list',
                    title: <FormattedMessage id="Lista" />,
                    type: 'item',
                    url: '/eventos',
                    icon: icons.ListTwoToneIcon,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default eventos;
