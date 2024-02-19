import React from 'react';
import Box from '@mui/material/Box';

const userContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
	textAlign: 'center',
	justifyContent: 'center',
};

const logoStyles = {
	color: '#696f79',
	fontWeight: '600',
	fontSize: '4rem',
	fontFamily: 'Bebas Neue',
	margin: '0',
	marginTop: '8px',
	marginLeft: '-30px',
};

export default function Logo() {
	return (
		<Box style={userContainerStyles}>
			<h1 style={logoStyles}>QUIZZOTO</h1>
		</Box>
	);
}
