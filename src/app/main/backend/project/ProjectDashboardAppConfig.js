import React from 'react';
import { authRoles } from 'app/auth';

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: true
				},
				toolbar: {
					display: false
				},
				footer: {
					display: true
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
	auth:authRoles.user,
	routes: [
		{
			path: '/products',
			component: React.lazy(() => import('./ProjectDashboardApp'))
		}
	]
};

export default ProjectDashboardAppConfig;
