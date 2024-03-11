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
};

const logoStyles600 = {
	color: '#696f79',
	fontWeight: '600',
	fontSize: '2.5rem',
	fontFamily: 'Bebas Neue',
	margin: '0',
	marginTop: '8px',
};

export default function Logo({ windowWidth }) {
	return (
		<Box style={userContainerStyles}>
			<h1 style={windowWidth > 600 ? logoStyles : logoStyles600}>QUIZZOTO</h1>
		</Box>
	);
}
