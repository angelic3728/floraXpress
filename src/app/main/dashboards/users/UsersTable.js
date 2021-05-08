import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectUsers, getUsers } from '../store/usersSlice';
import UsersTableHead from './UsersTableHead';

function UsersTable(props) {
	const dispatch = useDispatch();
	const auth_user = useSelector(({ auth }) => auth.user);
	const users = useSelector(selectUsers);
	const searchText = useSelector(({ floraXpressApp }) => floraXpressApp.users.searchText);
	const usersLoadFlag = useSelector(({ floraXpressApp }) => floraXpressApp.users.usersLoadFlag);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(users);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [loadFlag, setLoadFlag] = useState(false);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	function emptySelected() {
		setSelected([]);
	}

	function renderRole(role) {
		if (role === 2)
			return <Typography className="inline text-12 py-4 px-8 rounded bg-orange text-white font-bold">Admin</Typography>;
		else
			return <Typography className="inline text-12 py-4 px-8 rounded bg-blue-700 text-white font-bold">User</Typography>;
	}

	function handleClick(item) {
		props.history.push(`/admin/user/${item.id}`);
	}

	useEffect(() => {
		dispatch(getUsers({role:0, status:0, uid:auth_user.uid}));
	}, [dispatch, auth_user]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(FuseUtils.filterArrayByString(users, searchText));
			setPage(0);
		} else {
			setData(users);
		}
	}, [users, searchText]);

	useEffect(() => {
		setLoadFlag(usersLoadFlag);
	}, [usersLoadFlag]);

	return (
		<div className="w-full flex h-full">
			{(loadFlag && data.length !== 0) &&
				<div className="flex w-full flex-col sm:border-1 sm:rounded-16 overflow-hidden">
					<FuseScrollbars className="flex-grow overflow-x-auto">
						<div className="flex flex-col min-h-full">
							<Table stickyHeader className="min-w-xl mb-12" aria-labelledby="tableTitle">
								<UsersTableHead
									numSelected={selected.length}
									order={order}
									selected={selected}
									emptySelected={emptySelected}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={data.length}
								/>

								<TableBody>
									{_.orderBy(
										data,
										[
											o => {
												switch (order.id) {
													case 'f_name': {
														return o.name.split(" ")[0];
													}
													case 'l_name': {
														return o.name.split(" ")[1];
													}
													case 'created_at': {
														return o.createdAt._seconds;
													}
													default: {
														return o[order.id];
													}
												}
											}
										],
										[order.direction]
									)
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(n => {
											const isSelected = selected.indexOf(n.id) !== -1;
											return (
												<TableRow
													className="h-64 cursor-pointer"
													hover
													role="checkbox"
													aria-checked={isSelected}
													tabIndex={-1}
													key={n.id}
													selected={isSelected}
													onClick={event => handleClick(n)}
												>
													<TableCell className="w-40 md:w-64 text-center" padding="none">
														<Checkbox
															checked={isSelected}
															onClick={event => event.stopPropagation()}
															onChange={event => handleCheck(event, n.id)}
														/>
													</TableCell>

													<TableCell className="p-4" component="th" scope="row" align="right">
														{n.company}
													</TableCell>

													<TableCell className="p-4" component="th" scope="row" align="right">
														{n.email}
													</TableCell>
													<TableCell className="p-4" component="th" scope="row" align="right">
														{n.nif_vat}
													</TableCell>
													<TableCell className="p-4" component="th" scope="row" align="right">
														{n.phone}
													</TableCell>
													<TableCell className="p-4" component="th" scope="row" align="right">
														{n.address}
													</TableCell>
													<TableCell className="p-4" component="th" scope="row" align="right">
														{n.description}
													</TableCell>
													<TableCell className="p-4" component="th" scope="row" align="right">
														{renderRole(n.role)}
													</TableCell>
													<TableCell className="p-4" component="th" scope="row" align="center">
														{n.status ?
															<Icon className="text-green text-20">check_circle</Icon>
															:
															<Icon className="text-red text-20">remove_circle</Icon>
														}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</div>
					</FuseScrollbars>
					<TablePagination
						className="flex-shrink-0 border-t-1"
						component="div"
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						backIconButtonProps={{
							'aria-label': 'Previous Page'
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page'
						}}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</div>
			}

			{!loadFlag &&
				<div className="flex w-full justify-center items-center">
					<CircularProgress />
				</div>
			}
			{(loadFlag && data.length === 0) &&
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography variant="h5" className="text-gray-500">There are no users.</Typography>
				</div>
			}
		</div>
	);
}

export default withRouter(UsersTable);
