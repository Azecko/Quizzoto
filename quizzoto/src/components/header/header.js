import React from 'react';
import User from './user';
import SearchBar from './search';
import Logo from './logo';
import Box from '@mui/material/Box';

import { useState } from 'react';

export default function Header() {
	const [searchContent, setSearchContent] = useState('');

	const handleSearchChange = (content) => {
		console.log('content:', content);
		setSearchContent(content);
	};

	return (
		<header style={{ width: '100%', display: 'flex', height: '110px' }}>
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ width: '100%' }}>
				<Box gridColumn="span 2">
					<Logo />
				</Box>
				<Box gridColumn="span 8">
					<SearchBar onSearchChange={handleSearchChange} />
				</Box>

				<Box gridColumn="span 2">
					<User user={{ username: 'Dwesh45' }} />
				</Box>
			</Box>
		</header>
	);
}
