import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function Share(req, res) {
	try {
		const userId = req.body.user._id.toString();

		const session = await db.collection('session').findOne({ _id: new mongodb.ObjectId(req.query.sid) });
		const user = await db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });

		if (!session.share.includes(user.id)) {
			session.share.push(user.id);
		} else {
			session.share.splice(session.share.indexOf(user.id), 1);
		}

		await db.collection('session').updateOne({ _id: new mongodb.ObjectId(req.query.sid) }, { $set: { share: session.share } });

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Error sharing quizz:', error);
		res.status(500).json({ success: false, error: 'Internal server error' });
	}
}
