import { useSession, signIn, signOut } from 'next-auth/react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import User from './header/user';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

export default function LoginButton() {
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
	const BtnStyle = {
		appearance: 'button',
		backfaceVisibility: 'hidden',
		backgroundColor: '#405cf5',
		borderRadius: '10px',
		borderWidth: '0',
		boxShadow: 'rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0',
		boxSizing: 'border-box',
		color: '#fff',
		cursor: 'pointer',
		fontSize: '1rem',
		height: '35px',
		lineHeight: '1',
		bottom: '0',
		outline: 'none',
		overflow: 'hidden',
		textAlign: 'center',
		textTransform: 'none',
		transform: 'translateZ(0)',
		transition: 'all .2s,box-shadow .08s ease-in',
		userSelect: 'none',
		width: '5rem',
	};

	const { data: session } = useSession();
	const router = useRouter();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleProfileClick = () => {
		handleClose();
		router.push(`/user/${session.user.username}`);
	};

	if (session) {
		return (
			<div>
				{isMobile ? (
					<Button aria-controls={open ? 'demo-positioned-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
						<User />
					</Button>
				) : (
					<Button id="demo-positioned-button" aria-controls={open ? 'demo-positioned-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
						<User />
					</Button>
				)}
				<Menu
					id="demo-positioned-menu"
					aria-labelledby="demo-positioned-button"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}>
					<MenuItem onClick={handleProfileClick}>Profile</MenuItem>
					{/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
					<MenuItem onClick={() => signOut()}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
	return (
		<div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
			<button style={BtnStyle} onClick={() => signIn()}>
				Sign in
			</button>
		</div>
	);
}
