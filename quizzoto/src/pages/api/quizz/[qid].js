import collection from "../../../../lib/mongodb";

var mongodb = require('mongodb')

export default async function handler(req, res) {
    if(!mongodb.ObjectId.isValid(req.query.qid)) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.`})
    }

    const quizz = await collection.findOne({'_id': new mongodb.ObjectId(req.query.qid)});
    if(quizz == null) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid quizz's object id.`})
    }

    return res.status(200).send(quizz)
}
