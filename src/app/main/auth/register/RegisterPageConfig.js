import React from 'react';
import { authRoles } from 'app/auth';

const RegisterPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				},
				settingsPanel: {
					display: false
				}
			}
		}
	},
	auth:authRoles.onlyGuest,
	routes: [
		{
			path: '/auth/register',
			component: React.lazy(() => import('./RegisterPage'))
		}
	]
};

export default RegisterPageConfig;
