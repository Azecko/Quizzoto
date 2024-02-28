import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
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
	if (session) {
		return (
			<>
				{/* Signed in as {session.user.email} <br /> */}
				{/* <button onClick={() => signOut()}>Sign out</button> */}
			</>
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
