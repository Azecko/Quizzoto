import db from './mongodb';

var mongodb = require('mongodb');

export default async function getResults(session, rid) {
	if (!mongodb.ObjectId.isValid(rid)) {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid result's object id.` });
	}

	const result = await db.collection('results').findOne({ _id: new mongodb.ObjectId(rid) });
	if (result == null) {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid result's object id.` });
	}

	if (session == null || session.user.id != result.player) {
		return 401;
	}

	console.log(result);

	result._id = result._id.toString();
	result.quizz.id = result.quizz.id.toString();

	return result;
}
