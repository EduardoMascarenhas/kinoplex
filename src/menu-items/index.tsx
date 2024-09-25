import { NavItemType } from 'types';
import oportunidades from './oportunidades';
import convites from './convites';
import eventos from './eventos';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [oportunidades, convites, eventos]
};

export default menuItems;
