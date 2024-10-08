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

const clientes: NavItemType = {
    id: 'clientes',
    title: <FormattedMessage id="Cliente" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'client-list',
            title: <FormattedMessage id="Clientes" />,
            type: 'collapse',
            icon: icons.PeopleAltTwoToneIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'client-list',
                    title: <FormattedMessage id="Lista" />,
                    type: 'item',
                    url: '/clientes',
                    breadcrumbs: false,
                    icon: icons.ListTwoToneIcon
                }
            ]
        }
    ]
};

export default clientes;
