import FuseAnimate from '@fuse/core/FuseAnimate';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { getUsers, setUsersLoadFlag } from '../store/usersSlice';

const useStyles = makeStyles(() => ({
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '& .list-item-icon': {
            marginRight: 16
        }
    },
    activeListItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        backgroundColor: "#61dafb",
        pointerEvents: 'none',
        '& .list-item-icon': {
            color: 'inherit',
            marginRight: 16
        }
    }
}));

function UsersSidebarContent(props) {
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const auth_user = useSelector(({ auth }) => auth.user);
    const [role, setRole] = useState(0);
    const [status, setStatus] = useState(0);

    const getAllUsers = () => {
        setRole(0);
        setStatus(0);
        dispatch(setUsersLoadFlag());
        dispatch(getUsers({role:0, status:0}));
    }

    const getAdmins = () => {
        setRole(2);
        setStatus(0);
        dispatch(setUsersLoadFlag());
        dispatch(getUsers({role:2, status:0}));
    }

    const getStaffs = () => {
        setRole(1);
        setStatus(0);
        dispatch(setUsersLoadFlag());
        dispatch(getUsers({role:1, status:0}));
    }

    const getAllActives = () => {
        setRole(0);
        setStatus(1);
        dispatch(setUsersLoadFlag());
        dispatch(getUsers({role:0, status:1}));
    }

    const getAllSuspends = () => {
        setRole(0);
        setStatus(2);
        dispatch(setUsersLoadFlag());
        dispatch(getUsers({role:0, status:2}));
    }

    return (
        <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
            <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                <Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
                    <div className="p-24 flex items-center">
                        <Avatar alt={auth_user.displayName} />
                        <Typography className="mx-12">{auth_user.data.displayName}</Typography>
                    </div>
                    <Divider />
                    <List className="pt-24">
                        <ListItem
                            button
                            onClick={getAllUsers}
                            className={(role === 0 && status === 0) ? classes.activeListItem: classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">
                                people
							</Icon>
                            <ListItemText className="truncate" primary="All users" disableTypography />
                        </ListItem>
                        <ListItem
                            button
                            onClick={getAdmins}
                            className={(role === 2 && status === 0) ? classes.activeListItem: classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">
                                star
							</Icon>
                            <ListItemText className="truncate" primary="Administrators" disableTypography />
                        </ListItem>
                        <ListItem
                            button
                            onClick={getStaffs}
                            className={(role === 1 && status === 0) ? classes.activeListItem: classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">
                                star_border
							</Icon>
                            <ListItemText className="truncate" primary="Users" disableTypography />
                        </ListItem>
                        <ListItem
                            button
                            onClick={getAllActives}
                            className={(role === 0 && status === 1) ? classes.activeListItem: classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">
                                check_circle
							</Icon>
                            <ListItemText className="truncate" primary="Active Users" disableTypography />
                        </ListItem>
                        <ListItem
                            button
                            onClick={getAllSuspends}
                            className={(role === 0 && status === 2) ? classes.activeListItem: classes.listItem}
                        >
                            <Icon className="list-item-icon text-16" color="action">
                                cancel
							</Icon>
                            <ListItemText className="truncate" primary="Suspended Users" disableTypography />
                        </ListItem>
                    </List>
                </Paper>
            </FuseAnimate>
        </div>
    );
}

export default UsersSidebarContent;
