import db from '../../../lib/mongodb';

export default async function handler(req, res) {
	const quizzs = await db
		.collection('quizzs')
		.find(
			{},
			{
				projection: {
					quizzTitle: 1,
					quizzDescription: 1,
					quizzImg: 1,
					quizzInfo: 1,
					quizzSlug: 1,
				},
			}
		)
		.toArray();

	res.status(200).json(quizzs);
}
