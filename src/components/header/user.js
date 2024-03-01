import React from 'react';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';

const userContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
};

const usernameStyles = {
	marginLeft: '8px',
	color: '#8d9299',
	fontSize: '1rem',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

const imgStyle = {
	width: '4rem',
	height: '4rem',
	borderRadius: '50%',
};

export default function User({ user }) {
	const { data: session } = useSession();

	if (session) {
		const username = session.user.name;
		return (
			<Box style={userContainerStyles}>
				<img src={session.user.image} style={imgStyle} />
				<p style={usernameStyles}>{session.user.username}</p>
			</Box>
		);
	} else {
		return <></>;
	}
}
