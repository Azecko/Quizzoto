import React from 'react';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';

const userContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	scale: '90%',
};

const usernameStyles = {
	marginLeft: '8px',
	fontSize: '1rem',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

export default function User({ user, scale }) {
	if (user == undefined) {
		return;
	}
	if (user != undefined) {
		const username = user.name;
		return (
			<Box style={userContainerStyles}>
				<img
					src={user.image ? user.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
					style={{
						width: '4rem',
						height: '4rem',
						borderRadius: '50%',
						scale: scale,
					}}
				/>
				<p style={usernameStyles}>{user.username ? user.username : 'Anonymus'}</p>
			</Box>
		);
	} else {
		return <></>;
	}
}
