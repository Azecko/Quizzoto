import React from 'react';
import User from './user';
import SearchBar from './search';
import Logo from './logo';
import Box from '@mui/material/Box';

import LoginButton from '../loginButton';

import { useState } from 'react';

export default function Header({ windowWidth, setSearch }) {
	const [searchContent, setSearchContent] = useState('');

	const handleSearchChange = (content) => {
		console.log(setSearch);
		if (setSearch) {
			setSearch(content);
		} else {
			setSearchContent(content);
		}
	};

	if (windowWidth == undefined) {
		windowWidth = 1201;
	}

	return windowWidth > 1200 ? (
		<header style={{ width: '100%', display: 'flex', height: '110px', marginBottom: '20px' }}>
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ width: '100%' }}>
				<Box gridColumn="span 2">
					<Logo windowWidth={windowWidth} />
				</Box>
				<Box gridColumn="span 8">
					<SearchBar onSearchChange={handleSearchChange} />
				</Box>

				<Box gridColumn="span 2">
					<LoginButton />
					<User user={{ username: 'Dwesh45' }} />
				</Box>
			</Box>
		</header>
	) : (
		<header style={{ width: '100%', height: '100px' }}>
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ width: '100%' }}>
				<Box gridColumn="span 6">
					<Logo windowWidth={windowWidth} />
				</Box>
				<Box gridColumn="span 6">
					<User user={{ username: 'Dwesh45' }} />
				</Box>
			</Box>
		</header>
	);
}
