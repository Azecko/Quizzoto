import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Session(req, res) {
	console.log(req.query);

	return res.status(200).send('ok');
}
