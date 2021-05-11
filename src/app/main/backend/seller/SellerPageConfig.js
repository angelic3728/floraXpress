import React from 'react';

const HomeConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: true
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
			path: '/seller',
			component: React.lazy(() => import('./SellerPage'))
		},
	]
};

export default HomeConfig;
