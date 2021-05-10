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
			path: '/buyer',
			component: React.lazy(() => import('./BuyerPageConfig'))
		},
	]
};

export default HomeConfig;
