import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { v4 as uuidv4 } from 'uuid';
import db from '../../../../lib/mongodb';

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			console.log(user, account, profile);
			const existingUser = await db.collection('users').findOne({ email: user.email });

			if (existingUser) {
				const updatedUser = {
					$set: {
						username: profile.login,
						image: user.image,
						provider: account.provider,
						company: profile.company,
						name: profile.name,
						id: uuidv4(),
					},
				};
				await db.collection('users').updateOne({ email: user.email }, updatedUser);
			} else {
				const newUser = {
					id: uuidv4(),
					email: user.email,
					username: profile.login,
					image: user.image,
					provider: account.provider,
					company: profile.company,
					name: profile.name,
					points: 0,
					displayPoints: false,
				};
				await db.collection('users').insertOne(newUser);
			}
			return Promise.resolve(true);
		},

		async session({ session, token, user }) {
			let newSession = session;
			const existingUser = await db.collection('users').findOne({ email: session.user.email });

			newSession.user.id = existingUser.id;
			newSession.user.username = existingUser.username;
			return session;
		},
	},
};

export default NextAuth(authOptions);
