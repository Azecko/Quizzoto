import React from 'react';
import Box from '@mui/material/Box';
import Avatar from 'boring-avatars';
import { useSession, signIn, signOut } from 'next-auth/react';

const userContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	marginLeft: '20%',
};

const usernameStyles = {
	marginLeft: '8px',
	color: '#8d9299',
	fontSize: '1rem',
};

const imgStyle = {
	width: '4rem',
	borderRadius: '50%',
};

export default function User({ user }) {
	const { data: session } = useSession();

	if (session) {
		const username = session.user.name;
		return (
			<Box style={userContainerStyles}>
				<img src={session.user.image} style={imgStyle} />
				{/* <Avatar size={70} name={username} variant="beam" colors={['#264653', '#f4a261', '#e76f51']} /> */}
				<p style={usernameStyles}>{session.user.name}</p>
			</Box>
		);
	} else {
		return <></>;
	}
}
