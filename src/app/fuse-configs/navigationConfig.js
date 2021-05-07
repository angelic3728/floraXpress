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
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				url: '/dashboard'
			},
			{
				id: 'products',
				title: 'Products',
				translate: 'Products',
				type: 'item',
				auth : authRoles.user,
				icon: 'shopping_cart',
				url: '/products'
			},
			{
				id: 'users',
				title: 'Users',
				translate: 'Users',
				type: 'item',
				auth : authRoles.user,
				icon: 'people',
				url: '/users'
			}
		]
	}
];

export default navigationConfig;
