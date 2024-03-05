import db from './mongodb';

var mongodb = require('mongodb');

export default async function getSessionResults(session, sid) {
	if (!mongodb.ObjectId.isValid(sid)) {
		return 401;
	}

	const sessions = await db.collection('session').findOne({ _id: new mongodb.ObjectId(sid) });

	if (session == null || session.user.id != sessions.ownerId) {
		return 401;
	}

	const results = await db.collection('results').find({ sessionId: sid }).toArray();

	for (let i = 0; i < results.length; i++) {
		const result = results[i];
		const id = result.player;

		const playerInfo = await db.collection('users').findOne({ id: id });

		if (playerInfo) {
			result.player = {
				id: id,
				username: playerInfo.username,
				image: playerInfo.image,
				name: playerInfo.name,
			};
		}
	}

	const quizz = await db.collection('quizzs').findOne(
		{ _id: new mongodb.ObjectId(sessions.quizzId) },
		{
			projection: {
				quizzTitle: 1,
				quizzDescription: 1,
				quizzImg: 1,
				quizzInfo: 1,
				quizzSlug: 1,
			},
		}
	);

	quizz.results = results;

	quizz.sessionId = sid;

	quizz._id = quizz._id.toString();

	return JSON.stringify(quizz);
}
