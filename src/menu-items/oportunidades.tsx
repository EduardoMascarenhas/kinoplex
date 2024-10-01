// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons-react';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    TipsAndUpdatesTwoToneIcon: TipsAndUpdatesTwoToneIcon
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
            url: '/oportunidades',
            icon: icons.TipsAndUpdatesTwoToneIcon,
            breadcrumbs: false
        }
    ]
};

export default oportunidades;
