import db from "../../../../lib/mongodb";

var mongodb = require('mongodb')

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ statusCode: 405, message: `This request method is not valid on this route.`})
    }

    if(!mongodb.ObjectId.isValid(req.query.qid)) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.`})
    }

    const quizz = await db.collection('quizzs').findOne({'_id': new mongodb.ObjectId(req.query.qid)})
    if(quizz == null) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.`})
    }

    const answers = req.body
    var results = {}
    var score = 0

    quizz.questions.map(question => {
        switch(question.questionType) {
            case 'radios':
                score = answers[question.questionTitle].toLowerCase() == question.correctAnswer.toLowerCase() ? score + question.pointsIfCorrect : score - question.minusPointsIfWrong
                results[question.questionTitle] = {
                    questionTitle: question.questionTitle,
                    answeredCorrectly: answers[question.questionTitle].toLowerCase() == question.correctAnswer.toLowerCase() ? true : false,
                    points: answers[question.questionTitle].toLowerCase() == question.correctAnswer.toLowerCase() ? `+${question.pointsIfCorrect}` : `-${question.minusPointsIfWrong}`,
                    userAnswer: answers[question.questionTitle],
                    correctAnswer: question.correctAnswer
                }
            break;
            case 'checkboxes':
                let sortedQuizzAnswers = question.correctAnswer.slice().sort()
                let sortedUserAnswers = answers[question.questionTitle].slice().sort()

                for (let i = 0; i < sortedQuizzAnswers.length; i++) {
                    if (JSON.stringify(sortedQuizzAnswers[i].toLowerCase()) !== JSON.stringify(sortedUserAnswers[i].toLowerCase())) {
                        score = score - question.minusPointsIfWrong
                        return results[question.questionTitle] = {
                            questionTitle: question.questionTitle,
                            answeredCorrectly: false,
                            points: `-${question.minusPointsIfWrong}`,
                            userAnswer: answers[question.questionTitle],
                            correctAnswer: question.correctAnswer
                        }
                    }
                  }
                
                score = score + question.pointsIfCorrect
                results[question.questionTitle] = {
                    questionTitle: question.questionTitle,
                    answeredCorrectly: true,
                    points: `+${question.pointsIfCorrect}`,
                    userAnswer: answers[question.questionTitle],
                    correctAnswer: question.correctAnswer
                }
            break;
            case 'textfield':
                score = question.correctAnswer.includes(answers[question.questionTitle].toLowerCase()) ? score + question.pointsIfCorrect : score - question.minusPointsIfWrong
                results[question.questionTitle] = {
                    questionTitle: question.questionTitle,
                    answeredCorrectly: question.correctAnswer.includes(answers[question.questionTitle].toLowerCase()) ? true : false,
                    points: question.correctAnswer.includes(answers[question.questionTitle].toLowerCase()) ? `+${question.pointsIfCorrect}` : `-${question.minusPointsIfWrong}`,
                    userAnswer: answers[question.questionTitle],
                    correctAnswer: question.correctAnswer
                }
            break;
        }
    })

    return res.status(200).json({score, results})
}
