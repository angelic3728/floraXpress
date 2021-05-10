import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import HeaderNavigation from '@material-ui/core/BottomNavigation';
import HeaderNavigationAction from '@material-ui/core/BottomNavigationAction';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import HomeIcon from '@material-ui/icons/Home';
import Dashboard from '@material-ui/icons/Dashboard';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import ContactMail from '@material-ui/icons/ContactMail';

function ToolbarLayout1(props) {
	const dispatch = useDispatch();
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);
	const user = useSelector(({ auth }) => auth.user);
	const [value, setValue] = React.useState(1);
	const handleChange = (event, newValue) => {
		switch (newValue) {
			case 1: {
				props.history.push('/home');
				break;
			}
			case 2: {
				props.history.push('/dashboard');
				break;
			}
			case 3: {
				props.history.push('/seller');
				break;
			}
			case 4: {
				props.history.push('/buyer');
				break;
			}
			default: {
				props.history.push('/home');
			}
		}
	};

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className='flex relative z-10 sticky'
				color="default"
				style={{ backgroundColor: "#FFFFFF" }}
				elevation={2}
			>
				<Toolbar className="p-0 min-h-48 md:min-h-64">
					<div className="flex">
						<Hidden smUp>
							<IconButton
								onClick={ev => {
									props.pageLayout.current.toggleLeftSidebar();
								}}
								aria-label="open left sidebar"
								className="mt-8 ml-8"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>
						<Hidden mdDown>
							<Link to="/home"><img src="assets/images/logos/navbar-brand.png" alt="brand" className="ml-16 h-48"></img></Link>
						</Hidden>
					</div>
					<HeaderNavigation
						value={value}
						onChange={handleChange}
						showLabels
						style={{ backgroundColor: "transparent" }}
						className="hidden sm:flex sm:flex-1"
					>
						<HeaderNavigationAction label="Home" value={1} icon={<HomeIcon />} />
						{user.role.includes('admin') &&
							<HeaderNavigationAction label="Admin" value={2} icon={<Dashboard />} />
						}
						{user.role.includes('seller') &&
							<HeaderNavigationAction label="Admin" value={3} icon={<Dashboard />} />
						}
						{user.role.includes('buyer') &&
							<HeaderNavigationAction label="Admin" value={4} icon={<Dashboard />} />
						}
						<HeaderNavigationAction label="About us" value={5} icon={<SupervisedUserCircle />} />
						<HeaderNavigationAction label="Contact us" value={6} icon={<ContactMail />} />
					</HeaderNavigation>
					<div className="flex flex-1 sm:hidden"></div>
					<UserMenu />
					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default withRouter(React.memo(ToolbarLayout1));
