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
	const user = await db.collection('users').findOne({ username: username });

	if (user == null) {
		return null;
	}

	if (session == null || user.email !== session.user.email) {
		const newUser = {
			username: user.username,
			image: user.image,
		};

		if (user.displayPoints) {
			newUser.points = user.points;
		}

		return newUser;
	} else {
		delete user._id;
		return user;
	}
}

export async function getUserQuizzs(session, username) {
	const user = await db.collection('users').findOne({ username: username });

	const quizzs = await db.collection('quizzs').find({ creator: user.id }, { _id: 0 }).toArray();

	quizzs.forEach((quizz) => {
		delete quizz._id;
	});

	return quizzs;
}
