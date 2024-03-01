import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Session(req, res) {
	const users = await db
		.collection('users')
		.find(
			{},
			{
				projection: {
					username: 1,
					image: 1,
					displayPoints: 1,
					points: { $cond: { if: { $eq: ['$displayPoints', true] }, then: '$points', else: null } },
				},
			}
		)
		.toArray();

	return res.status(200).send(users);
}
