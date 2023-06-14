import db from "../../../lib/mongodb";

export default async function handler(req, res) {
  const quizzs = await db.collection('quizzs').find({}).toArray();
  res.status(200).json(quizzs)
}
