import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import db from '../../../../lib/mongodb';

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn(user, account, profile) {
			const existingUser = await db.collection('users').findOne({ email: user.user.email });
			if (existingUser) {
				const updatedUser = {
					$set: {
						username: user.profile.login,
						image: user.user.image,
						provider: user.account.provider,
						company: user.profile.company,
						name: user.profile.name,
					},
				};
				await db.collection('users').updateOne({ email: user.user.email }, updatedUser);
			} else {
				const newUser = {
					email: user.user.email,
					username: user.profile.login,
					image: user.user.image,
					provider: user.account.provider,
					company: user.profile.company,
					name: user.profile.name,
				};
				await db.collection('users').insertOne(newUser);
			}
			return Promise.resolve(true);
		},
	},
};

export default NextAuth(authOptions);
