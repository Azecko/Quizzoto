import db from "../../../../lib/mongodb";

var mongodb = require('mongodb')

export default async function handler(req, res) {
    if(!mongodb.ObjectId.isValid(req.query.rid)) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid result's object id.`})
    }

    const result = await db.collection('results').findOne({'_id': new mongodb.ObjectId(req.query.rid)})
    if(result == null) {
        return res.status(422).json({ statusCode: 422, message: `Please provide a valid result's object id.`})
    }

    return res.status(200).send(result)
}
