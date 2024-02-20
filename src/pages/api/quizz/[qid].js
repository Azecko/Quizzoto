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

export default async function handler(req, res) {
	let quizz = null;
	let quizzId = null;

	if (mongodb.ObjectId.isValid(req.query.qid)) {
		quizzId = req.query.qid;
	} else if (getQuizzIdFromSlug(req.query.qid) != null) {
		quizzId = await getQuizzIdFromSlug(req.query.qid);
	} else {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.` });
	}

	quizz = await db.collection('quizzs').findOne(
		{ _id: new mongodb.ObjectId(`${quizzId}`) },
		{
			projection: {
				quizzTitle: 1,
				quizzDescription: 1,
				quizzImg: 1,
				quizzInfo: 1,
				'questions.questionTitle': 1,
				'questions.questionType': 1,
				'questions.answers': 1,
			},
		}
	);

	if (quizz == null) {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.` });
	} else {
		if (req.query.q !== 'timeline') {
			if (req.query.q == NaN || !req.query.q) {
				req.query.q = 1;
			}
			const questionIndex = parseInt(req.query.q);
			quizz['questionsNumber'] = quizz.questions.length;
			if (questionIndex > quizz.questions.length || questionIndex < 1) {
				return res.status(422).json({ statusCode: 422, message: `Please provide a valid question index.` });
			}
			quizz.questions = quizz.questions[questionIndex - 1];
		}
	}

	return res.status(200).send(quizz);
}
