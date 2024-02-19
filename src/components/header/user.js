import React from 'react';
import Box from '@mui/material/Box';
import Avatar from 'boring-avatars';

const userContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	marginLeft: '20%',
};

const usernameStyles = {
	marginLeft: '8px',
	color: '#8d9299',
	fontSize: '1.3rem',
};

export default function User({ user }) {
	const username = user.username;

	return (
		<Box style={userContainerStyles}>
			<Avatar size={70} name={username} variant="beam" colors={['#264653', '#f4a261', '#e76f51']} />
			<p style={usernameStyles}>{username}</p>
		</Box>
	);
}
