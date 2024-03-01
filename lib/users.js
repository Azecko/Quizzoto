import db from './mongodb';

// var mongodb = require('mongodb');

// export async function getAllUsers(req, res) {
// 	const users = await db
// 		.collection('users')
// 		.find(
// 			{},
// 			{
// 				projection: {
// 					username: 1,
// 					image: 1,
// 				},
// 			}
// 		)
// 		.toArray();

// 	return res.status(200).send(users);
// }

export async function getUserData(session, username) {
	let newUser = {};
	console.log('username', username);
	const user = await db.collection('users').findOne({ username: username });
	console.log('session', session);
	if (session == 'null') {
		newUser = {
			username: user.username,
			image: user.image,
		};
	} else {
		if (user.email != session.user.email) {
			newUser = {
				username: user.username,
				image: user.image,
			};
		} else {
			newUser = user;
			delete newUser._id;
		}
	}

	return newUser;
}
