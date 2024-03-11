import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Session(req, res) {
	if (req.body == '') {
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
	const sessionId = JSON.parse(req.body).sessionId;

	if (req.body != '' && !mongodb.ObjectId.isValid(sessionId)) {
		return res.status(200).send([]);
	} else {
		let newUsers = [];

		const sessions = await db.collection('session').findOne({ _id: new mongodb.ObjectId(sessionId) });
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
						id: 1,
					},
				}
			)
			.toArray();

		for (let user of users) {
			if (sessions.share.includes(user.id)) {
				user.isShared = true;
			} else {
				user.isShared = false;
			}
			newUsers.push(user);
		}
		return res.status(200).send(newUsers);
	}
}
