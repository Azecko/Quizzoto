import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const userContainerStyles = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
};

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	width: '350px',
	height: '65px',
	borderRadius: '40px',
	color: '#7f858d',
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	fontSize: '2rem',
	marginTop: '2px',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#9ea8b8',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '30px',
	fontWeight: '400',
	fontSize: '1.2rem',
	// boxShadow: '0px 17px 33px 0px rgba(0,0,0,0.1)',
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
	},
}));

export default function SearchBar({ onSearchChange }) {
	const handleInputChange = (event) => {
		const content = event.target.value;
		onSearchChange(content);
	};

	return (
		<Box style={userContainerStyles}>
			<Search>
				<SearchIconWrapper>
					<SearchIcon fontSize="60px" />
				</SearchIconWrapper>
				<StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleInputChange} />
			</Search>
		</Box>
	);
}
