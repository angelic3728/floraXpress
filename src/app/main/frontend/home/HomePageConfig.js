import React from 'react';

const HomeConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: true
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
			path: '/home',
			component: React.lazy(() => import('./HomePage'))
		},
	]
};

export default HomeConfig;
