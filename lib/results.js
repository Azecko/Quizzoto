import db from './mongodb';

var mongodb = require('mongodb');

export default async function getResults(session, rid) {
	console.log(rid);
	if (!mongodb.ObjectId.isValid(rid)) {
		return 401;
	}
	const result = await db.collection('results').findOne({ _id: new mongodb.ObjectId(rid) });

	if (result == null) {
		return 401;
	}

	result._id = result._id.toString();
	result.quizz.id = result.quizz.id.toString();

	if (result.sessionId && session) {
		const gameSession = await db.collection('session').findOne({ _id: new mongodb.ObjectId(result.sessionId) });

		if (gameSession.ownerId == session.user.id) {
			return result;
		}
	}

	if (result.visibility == 'hidden') {
		return result;
	}

	if (session.user.id == result.player.user.id && result.visibility == 'private') {
		return result;
	} else {
		return 401;
	}
}
