import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
	{ id: 'name', label: 'Name', minWidth: 170 },
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
	let modifiedData = [];

	for (const result of data) {
		modifiedData.push({
			name: result.results[0].userAnswer,
			score: result.score,
			href: (
				<a target="_blank" href={`/result/${result._id}`}>
					{result._id}
				</a>
			),
		});
	}
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
										console.log(value);
										return (
											<TableCell key={column.id} align={column.align}>
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
