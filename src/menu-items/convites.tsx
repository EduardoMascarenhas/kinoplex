// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons-react';
import TipsAndUpdatesTwoToneIcon from '@mui/icons-material/TipsAndUpdatesTwoTone';
import LocalActivityTwoToneIcon from '@mui/icons-material/LocalActivityTwoTone';
import StadiumTwoToneIcon from '@mui/icons-material/StadiumTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import PriceChangeTwoToneIcon from '@mui/icons-material/PriceChangeTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';

// type
import { NavItemType } from 'types';

const icons = {
    IconDashboard: IconDashboard,
    TipsAndUpdatesTwoToneIcon: TipsAndUpdatesTwoToneIcon,
    LocalActivityTwoToneIcon: LocalActivityTwoToneIcon,
    StadiumTwoToneIcon: StadiumTwoToneIcon,
    PeopleAltTwoToneIcon: PeopleAltTwoToneIcon,
    ListTwoToneIcon: ListTwoToneIcon,
    RemoveCircleTwoToneIcon: RemoveCircleTwoToneIcon,
    PriceChangeTwoToneIcon: PriceChangeTwoToneIcon,
    Inventory2TwoToneIcon: Inventory2TwoToneIcon
};

const convites: NavItemType = {
    id: 'convites-collapse',
    title: <FormattedMessage id="Convite" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'invites',
            title: <FormattedMessage id="Convites" />,
            type: 'collapse',
            icon: icons.LocalActivityTwoToneIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'invite-list',
                    title: <FormattedMessage id="Lista" />,
                    type: 'item',
                    url: '/convites',
                    breadcrumbs: false,
                    icon: icons.ListTwoToneIcon
                },
                {
                    id: 'invite-block',
                    title: <FormattedMessage id="Bloqueio" />,
                    type: 'item',
                    url: '/convite/bloqueio',
                    breadcrumbs: false,
                    icon: icons.RemoveCircleTwoToneIcon
                },
                {
                    id: 'invite-clientes',
                    title: <FormattedMessage id="Clientes" />,
                    type: 'item',
                    url: '/convite/clientes',
                    breadcrumbs: false,
                    icon: icons.PeopleAltTwoToneIcon
                },
                {
                    id: 'invite-sales',
                    title: <FormattedMessage id="Vendas" />,
                    type: 'item',
                    url: '/convite/vendas',
                    breadcrumbs: false,
                    icon: icons.PriceChangeTwoToneIcon
                },
                {
                    id: 'invite--batch-sales',
                    title: <FormattedMessage id="Lotes" />,
                    type: 'item',
                    url: '/convite/lotes',
                    breadcrumbs: false,
                    icon: icons.Inventory2TwoToneIcon
                }
            ]
        }
    ]
};

export default convites;
