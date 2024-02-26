import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

async function getQuizzIdFromSlug(quizzSlug) {
	let id = await db.collection('quizzs').findOne(
		{ quizzSlug: quizzSlug },
		{
			projection: {
				_id: 1,
			},
		}
	);
	return id._id.toString();
}

export default async function Session(req, res) {
	const quizzId = await getQuizzIdFromSlug(req.query.s);

	let newSession = {
		quizzId: quizzId,
	};

	db.collection('session').insertOne(newSession);

	return res.status(200).send(newSession);
}
