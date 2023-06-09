import collection from "../../../lib/mongodb";

export default async function handler(req, res) {
  const quizzs = await collection.find({}).toArray();
  res.status(200).json(quizzs)
}
