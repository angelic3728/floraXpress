import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import UsersMultiSelectMenu from './UsersMultiSelectMenu';
import React from 'react';

const rows = [
	{
		id: 'company',
		align: 'right',
		disablePadding: false,
		label: 'Company Name',
		sort: true
	},
	{
		id: 'email',
		align: 'right',
		disablePadding: false,
		label: 'Email',
		sort: true
	},
	{
		id: 'nif_vat',
		align: 'right',
		disablePadding: false,
		label: 'NIF/VAT',
		sort: true
	},
	{
		id: 'phone',
		align: 'right',
		disablePadding: false,
		label: 'Phone',
		sort: true
	},
	{
		id: 'address',
		align: 'right',
		disablePadding: false,
		label: 'Address',
		sort: true
	},
	{
		id: 'description',
		align: 'right',
		disablePadding: false,
		label: 'Description',
		sort: true
	},
	{
		id: 'role',
		align: 'right',
		disablePadding: false,
		label: 'Role',
		sort: true
	},
	{
		id: 'status',
		align: 'center',
		disablePadding: false,
		label: 'Status',
		sort: true
	},
];

function UsersTableHead(props) {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
						checked={props.numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{props.numSelected > 0 && (
						<UsersMultiSelectMenu selectedUserIds = {props.selected} emptySelected={props.emptySelected} />
					)}
				</TableCell>
				{rows.map(row => {
					return (
						<TableCell
							className="p-4"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default UsersTableHead;
