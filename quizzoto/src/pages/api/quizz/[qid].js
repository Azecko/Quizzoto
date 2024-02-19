import db from '../../../../lib/mongodb';

var mongodb = require('mongodb');

export default async function handler(req, res) {
	if (!mongodb.ObjectId.isValid(req.query.qid) && req.query.qid !== 'demo') {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.` });
	}
	
	console.log(req.query.qid);
 	let quizz = null
	// Special case for the demo quizz
	// TODO: at some point, this should be dynamically done
	if (req.query.qid === 'demo') {
		quizz = await db.collection('quizzs').findOne(
			{ quizzSlug: 'demo' },
			{
				projection: {
					quizzTitle: 1,
					quizzDescription: 1,
					'questions.questionTitle': 1,
					'questions.questionType': 1,
					'questions.answers': 1,
				},
			}
		);
	} else {
		quizz = await db.collection('quizzs').findOne(
			{ _id: new mongodb.ObjectId(req.query.qid) },
			{
				projection: {
					quizzTitle: 1,
					quizzDescription: 1,
					'questions.questionTitle': 1,
					'questions.questionType': 1,
					'questions.answers': 1,
				},
			}
		);
	}

	if (quizz == null) {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.` });
	} else {
		console.log(req.query);
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
