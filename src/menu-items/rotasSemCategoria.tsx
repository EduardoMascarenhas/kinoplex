// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons-react';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import StadiumTwoToneIcon from '@mui/icons-material/StadiumTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    TipsAndUpdatesTwoToneIcon: TipsAndUpdatesTwoToneIcon,
    LocalActivityTwoToneIcon: LocalActivityTwoToneIcon,
    StadiumTwoToneIcon: StadiumTwoToneIcon,
    PeopleAltTwoToneIcon: PeopleAltTwoToneIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const rotasSemCategoria: NavItemType = {
    id: 'rotasSemCategoria',
    title: <FormattedMessage id="Cineticket" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'opportunities-list',
            title: <FormattedMessage id="Oportunidades" />,
            type: 'item',
            url: '/oportunidades',
            icon: icons.TipsAndUpdatesTwoToneIcon,
            breadcrumbs: false
        },
        {
            id: 'invite-list',
            title: <FormattedMessage id="Convites" />,
            type: 'item',
            url: '/convites',
            icon: icons.LocalActivityTwoToneIcon,
            breadcrumbs: false
        },
        {
            id: 'event-list',
            title: <FormattedMessage id="Eventos" />,
            type: 'item',
            url: '/eventos',
            icon: icons.StadiumTwoToneIcon,
            breadcrumbs: false
        },
        {
            id: 'client-list',
            title: <FormattedMessage id="Clientes" />,
            type: 'item',
            url: '/clientes',
            icon: icons.PeopleAltTwoToneIcon,
            breadcrumbs: false
        }
    ]
};

export default rotasSemCategoria;
