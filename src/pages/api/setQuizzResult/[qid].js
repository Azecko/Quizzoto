import db from '../../../../lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

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
	if (req.method !== 'POST') {
		return res.status(405).json({ statusCode: 405, message: `This request method is not valid on this route.` });
	}

	req.body = JSON.parse(req.body);

	let quizzId = null;
	let sessionId = req.query.s;

	if (mongodb.ObjectId.isValid(req.query.qid)) {
		quizzId = req.query.qid;
	} else if (getQuizzIdFromSlug(req.query.qid) != null) {
		quizzId = await getQuizzIdFromSlug(req.query.qid);
	} else {
		return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.` });
	}

	const quizz = await db.collection('quizzs').findOne({ _id: new mongodb.ObjectId(`${quizzId}`) });

	function isJsonString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return req.body.answers;
		}
		return JSON.parse(req.body.answers);
	}

	const answers = isJsonString(req.body.answers);
	var results = [];
	var score = 0;

	function arrayToLowerCase(array) {
		return array.map((v) => v.toLowerCase());
	}

	function checkUserAnswersForCheckboxes(questionAnswers, userAnswers) {
		let questionPass = 0;
		userAnswers.forEach((e, i) => {
			if (arrayToLowerCase(questionAnswers).includes(e.toLowerCase())) {
				questionPass++;
			}
		});
		return !!(questionAnswers.length === questionPass);
	}
	quizz.questions.map((question, index) => {
		index += 1;
		if (answers[index.toString()] == null) {
			return results.push({
				questionTitle: question.questionTitle,
				answeredCorrectly: null,
				points: `-${question.minusPointsIfWrong}`,
				userAnswer: 'empty',
				correctAnswer: question.correctAnswer,
			});
		}
		switch (question.questionType) {
			case 'radios':
				if (answers[index.toString()] == null) {
					score = score - question.minusPointsIfWrong;
					return results.push({
						questionTitle: question.questionTitle,
						answeredCorrectly: false,
						points: `-${question.minusPointsIfWrong}`,
						userAnswer: answers[index.toString()],
						correctAnswer: question.correctAnswer,
					});
				}
				score = answers[index.toString()].toLowerCase() == question.correctAnswer.toLowerCase() ? score + question.pointsIfCorrect : score - question.minusPointsIfWrong;
				results.push({
					questionTitle: question.questionTitle,
					answeredCorrectly: answers[index.toString()].toLowerCase() == question.correctAnswer.toLowerCase() ? true : false,
					points: answers[index.toString()].toLowerCase() == question.correctAnswer.toLowerCase() ? `+${question.pointsIfCorrect}` : `-${question.minusPointsIfWrong}`,
					userAnswer: answers[index.toString()],
					correctAnswer: question.correctAnswer,
				});
				break;
			case 'checkboxes':
				if (answers[index.toString()] == false || answers[index.toString()].length == 0) {
					score = score - question.minusPointsIfWrong;
					return results.push({
						questionTitle: question.questionTitle,
						answeredCorrectly: false,
						points: `-${question.minusPointsIfWrong}`,
						userAnswer: answers[index.toString()],
						correctAnswer: question.correctAnswer,
					});
				}

				let sortedQuizzAnswers = question.correctAnswer.slice().sort();
				let sortedUserAnswers = answers[index.toString()].slice().sort();

				if (checkUserAnswersForCheckboxes(sortedQuizzAnswers, sortedUserAnswers)) {
					results.push({
						questionTitle: question.questionTitle,
						answeredCorrectly: true,
						points: `+${question.pointsIfCorrect}`,
						userAnswer: answers[index.toString()],
						correctAnswer: question.correctAnswer,
					});
				} else {
					results.push({
						questionTitle: question.questionTitle,
						answeredCorrectly: false,
						points: `-${question.minusPointsIfWrong}`,
						userAnswer: answers[index.toString()],
						correctAnswer: question.correctAnswer,
					});
				}

				break;
			case 'textfield':
				score = question.correctAnswer.includes(answers[index.toString()].toLowerCase()) ? score + question.pointsIfCorrect : score - question.minusPointsIfWrong;
				results.push({
					questionTitle: question.questionTitle,
					answeredCorrectly: question.correctAnswer.includes(answers[index.toString()].toLowerCase()) ? true : false,
					points: question.correctAnswer.includes(answers[index.toString()].toLowerCase()) ? `+${question.pointsIfCorrect}` : `-${question.minusPointsIfWrong}`,
					userAnswer: answers[index.toString()],
					correctAnswer: question.correctAnswer,
				});
				break;
		}
	});

	const id = uuidv4();

	if (req.body.info == null) {
		const newUser = {
			id: id,
			email: null,
			username: null,
			image: null,
			provider: null,
			company: null,
			name: null,
			points: null,
			displayPoints: false,
		};
		await db.collection('users').insertOne(newUser);
	}

	let returnObject = {
		quizz: {
			id: quizz._id,
			title: quizz.quizzTitle,
			description: quizz.quizzDescription,
			quizzSlug: quizz.quizzSlug,
		},
		score,
		results,
		sessionId,
		player: req.body.info ? req.body.info.user.id : id,
		time: Date.now(),
	};

	db.collection('results').insertOne(returnObject);

	return res.status(200).json(returnObject);
}
