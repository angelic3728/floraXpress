import React from 'react';

const AnalyticsDashboardAppConfig = {
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
	routes: [
		{
			path: '/dashboard',
			component: React.lazy(() => import('./AnalyticsDashboardApp'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
