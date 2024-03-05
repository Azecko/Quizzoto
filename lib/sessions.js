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
	results.forEach((result) => {
		result._id = result._id.toString();
	});

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
