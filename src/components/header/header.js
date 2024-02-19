import React, { useState } from 'react';
import User from './user';
import SearchBar from './search';
import Logo from './logo';
import Box from '@mui/material/Box';

export default function Header({ quizzTitle }) {
	const [searchContent, setSearchContent] = useState('');

	const handleSearchChange = (content) => {
		setSearchContent(content);
	};

	console.log(quizzTitle);

	return (
		<header style={{ width: '100%', display: 'flex', height: '110px' }}>
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ width: '100%' }}>
				<Box gridColumn="span 2">
					<Logo />
				</Box>
				<Box gridColumn="span 8">{quizzTitle != '' ? quizzTitle : quizzTitle == '' ? quizzTitle : <SearchBar onSearchChange={handleSearchChange} />}</Box>
				<Box gridColumn="span 2">
					<User user={{ username: 'Dwesh45' }} />
				</Box>
			</Box>
		</header>
	);
}
