import { NavItemType } from 'types';
import oportunidades from './oportunidades';
import convites from './convites';
import eventos from './eventos';
import clientes from './clientes';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [oportunidades, convites, eventos, clientes]
};

export default menuItems;
