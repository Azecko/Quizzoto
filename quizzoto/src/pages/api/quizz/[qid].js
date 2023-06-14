import db from "../../../../lib/mongodb";

var mongodb = require('mongodb')

export default async function handler(req, res) {
    if(!mongodb.ObjectId.isValid(req.query.qid)) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.`})
    }

    const quizz = await db.collection('quizzs').findOne({'_id': new mongodb.ObjectId(req.query.qid)}, {projection: {
        "quizzTitle": 1,
        "quizzDescription": 1,
        "questions.questionTitle": 1,
        "questions.questionType": 1,
        "questions.answers": 1,
    }});
    if(quizz == null) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.`})
    }

    return res.status(200).send(quizz)
}
