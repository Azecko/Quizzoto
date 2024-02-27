import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Session(req, res) {
	const results = await db.collection('results').find({ sessionId: req.query.sid }).toArray();

	const quizzId = await db.collection('session').findOne({ _id: new mongodb.ObjectId(req.query.sid) });

	const quizz = await db.collection('quizzs').findOne(
		{ _id: new mongodb.ObjectId(quizzId.quizzId) },
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
	quizz.sessionId = req.query.sid;

	return res.status(200).send(quizz);
}
