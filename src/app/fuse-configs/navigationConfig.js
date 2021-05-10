import { authRoles } from 'app/auth';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		translate: 'Dashboard',
		type: 'item',
		auth : authRoles.admin,
		icon: 'dashboard',
		url: '/dashboard'
	},
	{
		id: 'products',
		title: 'Products',
		translate: 'Products',
		type: 'item',
		auth : authRoles.admin,
		icon: 'shopping_cart',
		url: '/products'
	},
	{
		id: 'users',
		title: 'Users',
		translate: 'Users',
		type: 'item',
		auth : authRoles.admin,
		icon: 'people',
		url: '/users'
	},
	{
		id: 'buyer_page',
		title: 'Buyer page',
		translate: 'Buyer Page',
		type: 'item',
		auth : authRoles.buyer,
		icon: 'shopping_cart',
		url: '/buyer'
	},
	{
		id: 'seller_page',
		title: 'Seller page',
		translate: 'Seller Page',
		type: 'item',
		auth : authRoles.seller,
		icon: 'payment',
		url: '/seller'
	},
	{
		id: 'to_home',
		title: 'Back To Home',
		translate: 'Back to home',
		type: 'item',
		icon: 'home',
		url: '/home'
	},
];

export default navigationConfig;
