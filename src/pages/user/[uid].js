import Header from '../../components/header/header';
import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
	const { data: session, status } = useSession();

	const [user, setUser] = useState();

	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	console.log(status);

	useEffect(() => {
		if (!router.query.uid) {
			return;
		}

		const getData = async () => {
			const response = await fetch(`/api/user/${router.query.uid}`, { method: 'POST', body: JSON.stringify(session) });
			const jsonData = await response.json();
			setUser(jsonData);
			console.log(jsonData);
			setIsLoading(false);
		};
		getData();
	}, [router.query.uid]);

	return (
		<>
			<Header />
			<h1>Profile</h1>
			{!isLoading ? (
				<>
					<p>username: {user.username}</p>
					{status == 'authenticated' ? (
						<>
							<p>company: {user.company}</p>
							<p>Name: {user.name}</p>
							<p>provider: {user.provider}</p>
						</>
					) : (
						<></>
					)}

					<img src={user.image} alt={user.name} />
				</>
			) : (
				<h1>Loading</h1>
			)}
			{!user && <p>Please sign in to view your profile.</p>}
		</>
	);
}

async function fetchUser(uid) {
	const username = useRouter().query.uid;
	const response = await fetch(`/api/users/${username}`);
	if (!response.ok) {
		throw new Error('Failed to fetch user data');
	}
	return response.json();
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session: session ?? null,
		},
	};
}
