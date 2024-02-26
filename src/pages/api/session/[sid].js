import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Session(req, res) {
	const results = await db.collection('results').find({ sessionId: req.query.sid }).toArray();

	return res.status(200).send(results);
}
