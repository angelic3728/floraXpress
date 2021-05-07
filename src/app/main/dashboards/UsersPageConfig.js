import React from 'react';
import { authRoles } from 'app/auth';

const UsersPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth:authRoles.user,
	routes: [
		{
			path: '/users',
			component: React.lazy(() => import('./users'))
		}
	]
};

export default UsersPageConfig;
