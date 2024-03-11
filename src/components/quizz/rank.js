import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from 'boring-avatars';

function createData(name, time, points) {
	return { username: name, time, points };
}
const rows = [createData('Azecko', '12min', 1800), createData('JaavLex', '12min', 1800), createData('Dwesh45', '12min', 1800), createData('ponsfrilus', '12min', 1800)];

export default function Rank() {
	return (
		<>
			<h3>Rank</h3>
			<div style={{ padding: '12px', width: '90%' }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 120 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell></TableCell>

								<TableCell align="center" colSpan={2}>
									username
								</TableCell>
								<TableCell align="center">points</TableCell>
								<TableCell align="center">time</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell style={{ padding: '0 5px', textAlign: 'center' }}>{index + 1}</TableCell>
									<TableCell style={{ display: 'flex', justifyContent: 'center', padding: '5px 0px' }}>
										<Avatar size={40} name={row.username} variant="beam" colors={['#264653', '#f4a261', '#e76f51']} />
									</TableCell>
									<TableCell align="left"> {row.username}</TableCell>
									<TableCell align="center">{row.points} points</TableCell>
									<TableCell align="center">{row.time}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
}
