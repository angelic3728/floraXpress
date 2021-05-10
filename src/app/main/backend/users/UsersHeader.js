import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { setUsersSearchText } from './store/usersSlice';

function UsersHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ floraXpressApp }) => floraXpressApp.users.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between p-4 sm:p-24">
			<Hidden lgUp>
				<IconButton
					onClick={ev => {
						props.pageLayout.current.toggleLeftSidebar();
					}}
					aria-label="open left sidebar"
				>
					<Icon>menu</Icon>
				</IconButton>
			</Hidden>

			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">people_alt</Icon>
				</FuseAnimate>

				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-6" variant="h6">
						Users
					</Typography>
				</FuseAnimate>
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(setUsersSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div>
		</div>
	);
}

export default UsersHeader;
