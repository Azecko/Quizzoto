import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import User from './header/user';

const columns = [
	{
		id: 'user',
		label: 'User',
		minWidth: 10,
		align: 'left',
		renderCell: (params) => {
			user;
		},
	},
	{ id: 'name', label: 'name', minWidth: 300 },
	{ id: 'score', label: 'score', minWidth: 100 },
	{
		id: 'href',
		label: 'result',
		minWidth: 170,
		align: 'right',
		renderCell: (params) => {
			href;
		},
	},
];

export default function SessionTable({ data }) {
	const [results, setResults] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	let modifiedData = [];

	React.useEffect(() => {
		if (data == undefined) {
			return;
		}
		setResults(data);
	}, [data]);

	for (const result of results) {
		modifiedData.push({
			user: <User user={result.player} scale={'80%'} />,
			score: result.score,
			href: (
				<a target="_blank" href={`/result/${result._id}`}>
					{result._id}
				</a>
			),
			name: result.player.name,
		});
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%' }}>
			<TableContainer style={{ height: 'calc(100vh - 470px)' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{modifiedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={index}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align} style={{ padding: '0 16px 0 0' }}>
												{column.format && typeof value === 'number' ? column.format(value) : value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={modifiedData.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
		</Paper>
	);
}
