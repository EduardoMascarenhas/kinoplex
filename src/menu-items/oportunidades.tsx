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

const oportunidades: NavItemType = {
    id: 'oportunidades',
    title: <FormattedMessage id="Oportunidade" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'opportunities',
            title: <FormattedMessage id="Oportunidades" />,
            type: 'collapse',
            icon: icons.TipsAndUpdatesTwoToneIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'opportunities-list',
                    title: <FormattedMessage id="Lista" />,
                    type: 'item',
                    url: '/oportunidades',
                    breadcrumbs: false,
                    icon: icons.ListTwoToneIcon
                }
            ]
        }
    ]
};

export default oportunidades;
