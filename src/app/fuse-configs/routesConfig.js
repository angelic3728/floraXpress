import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginPageConfig from 'app/main/auth/login/LoginPageConfig';
import RegisterPageConfig from 'app/main/auth/register/RegisterPageConfig';
import HomePageConfig from 'app/main/frontend/home/HomePageConfig';
import DashboardPageConfig from 'app/main/backend/analytics/AnalyticsDashboardAppConfig';
import ProductsPageConfig from 'app/main/backend/project/ProjectDashboardAppConfig';
import UsersPageConfig from 'app/main/backend/users/UsersPageConfig';
import BuyerPageConfig from 'app/main/backend/buyer/BuyerPageConfig';
import SellerPageConfig from 'app/main/backend/seller/SellerPageConfig';

const routeConfigs = [LoginPageConfig,
					  RegisterPageConfig,
					  DashboardPageConfig, 
					  ProductsPageConfig, 
					  UsersPageConfig, 
					  HomePageConfig,
					  BuyerPageConfig,
					  SellerPageConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/home" />
	}
];

export default routes;
