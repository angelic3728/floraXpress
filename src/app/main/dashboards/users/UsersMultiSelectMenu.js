import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUsers, setUsersLoadFlag } from '../store/usersSlice';

function UsersMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedUserIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedUsersMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedUsersMenu() {
		setAnchorEl(null);
	}

	return (
		<div className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1 bg-white">
			<IconButton
				className="p-12"
				aria-owns={anchorEl ? 'selectedUsersMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedUsersMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedUsersMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedUsersMenu}
			>
				<MenuList className="outline-none">
					<MenuItem
						onClick={() => {
							closeSelectedUsersMenu();
                            dispatch(setUsersLoadFlag());
                            props.emptySelected();
                            dispatch(updateUsers({role:2, status:0, selectedUserIds:selectedUserIds}));
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star</Icon>
						</ListItemIcon>
						<ListItemText primary="Make as Admin" />
					</MenuItem>
                    <MenuItem
						onClick={() => {
							closeSelectedUsersMenu();
                            dispatch(setUsersLoadFlag());
                            props.emptySelected();
                            dispatch(updateUsers({role:1, status:0, selectedUserIds:selectedUserIds}));
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>star_border</Icon>
						</ListItemIcon>
						<ListItemText primary="Make as User" />
					</MenuItem>
                    <MenuItem
						onClick={() => {
							closeSelectedUsersMenu();
                            dispatch(setUsersLoadFlag());
                            props.emptySelected();
                            dispatch(updateUsers({role:0, status:1, selectedUserIds:selectedUserIds}));
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>check_circle</Icon>
						</ListItemIcon>
						<ListItemText primary="Active" />
					</MenuItem>
                    <MenuItem
						onClick={() => {
							closeSelectedUsersMenu();
                            dispatch(setUsersLoadFlag());
                            props.emptySelected();
                            dispatch(updateUsers({role:0, status:2, selectedUserIds:selectedUserIds}));
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>cancel</Icon>
						</ListItemIcon>
						<ListItemText primary="Suspend" />
					</MenuItem>
				</MenuList>
			</Menu>
		</div>
	);
}

export default UsersMultiSelectMenu;
