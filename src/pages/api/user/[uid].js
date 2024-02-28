import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Session(req, res) {
	let newUser = {};
	const user = await db.collection('users').findOne({ username: req.query.uid });
	if (req.body == 'null') {
		newUser = {
			username: user.username,
			image: user.image,
		};
	} else {
		if (user.email != JSON.parse(req.body).user.email) {
			newUser = {
				username: user.username,
				image: user.image,
			};
		} else {
			newUser = user;
		}
	}

	return res.status(200).send(newUser);
}
