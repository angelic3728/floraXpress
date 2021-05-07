import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginPageConfig from 'app/main/auth/login/LoginPageConfig';
import RegisterPageConfig from 'app/main/auth/register/RegisterPageConfig';
import DashboardPageConfig from 'app/main/dashboards/analytics/AnalyticsDashboardAppConfig';
import ProductsPageConfig from 'app/main/dashboards/project/ProjectDashboardAppConfig';
import UsersPageConfig from 'app/main/dashboards/UsersPageConfig';

const routeConfigs = [LoginPageConfig, RegisterPageConfig, DashboardPageConfig, ProductsPageConfig, UsersPageConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/dashboard" />
	}
];

export default routes;
