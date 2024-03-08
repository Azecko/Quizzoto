import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserList from './userList';
import User from './header/user';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';

import { ShareFill } from 'react-bootstrap-icons';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: '#fff',
	borderRadius: '30px',
	fontWeight: '400',
	fontSize: '1.2rem',
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	padding: '2rem',
	height: '50ch',
	color: '#696f79',
};

const buttonStyle = {
	marginBottom: '1rem',
};

export default function ShareModal({ userSession }) {
	const [open, setOpen] = React.useState(false);
	const [searchTerm, setSearchTerm] = React.useState('');
	const [filteredUsers, setFilteredUsers] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [users, setUsers] = React.useState([]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const router = useRouter();

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	React.useEffect(() => {
		const getData = async () => {
			const response = await fetch(`/api/user/all`);
			const jsonData = await response.json();
			setUsers(jsonData);
			setIsLoading(false);
		};
		getData();
	}, []);

	React.useEffect(() => {
		if (!searchTerm) {
			setFilteredUsers(users);
		} else {
			const filtered = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
			setFilteredUsers(filtered);
		}
	}, [searchTerm, users]);

	const shareUser = async (user) => {
		try {
			const response = await fetch(`/api/share/${router.query.sid}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user }),
			});

			if (!response.ok) {
				throw new Error('Failed to share user');
			}
		} catch (error) {
			console.error('Error sharing user:', error.message);
		}
	};

	const renderUserButtons = () => {
		return filteredUsers.map((user, index) => (
			<div key={index}>
				<Button style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color: '#696f79' }} onClick={() => shareUser(user)}>
					<User user={user} />
					<ShareFill size={20} />
				</Button>
			</div>
		));
	};

	return (
		<div>
			{!isLoading ? (
				<>
					<Button onClick={handleOpen} style={buttonStyle}>
						Share Session
					</Button>
					<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
						<Box style={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Share Session
							</Typography>
							<TextField id="outlined-basic" label="Search" variant="outlined" value={searchTerm} onChange={handleSearch} fullWidth style={{ marginBottom: '1rem' }} />
							<div>{filteredUsers.length > 0 ? renderUserButtons() : <p>No users found</p>}</div>
						</Box>
					</Modal>
				</>
			) : (
				<Button onClick={handleOpen} style={buttonStyle}>
					Open modal
				</Button>
			)}
		</div>
	);
}
