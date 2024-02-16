db = db.getSiblingDB('quizzoto');

db.createCollection('results');
db.createCollection('quizzs');

db.quizzs.insert([
	{
		quizzTitle: 'Super quizz',
		quizzDescription: 'Ce super quizz pose des questions sur le super groupe ISAS-FSD.',
		questions: [
			{
				questionTitle: 'Qui est le meilleur développeur React du monde ?',
				questionType: 'radios',
				answers: ['Azecko', 'JaavLex', 'Ponsfrilus', 'Dwesh163'],
				correctAnswer: 'Dwesh163',
				pointsIfCorrect: 1,
				minusPointsIfWrong: 1,
			},
			{
				questionTitle: 'Qui a participé aux RegionalsSkills 2023 ?',
				questionType: 'checkboxes',
				answers: ['Emyxi', 'JaavLex', 'Pyrosaphire', 'Azecko'],
				correctAnswer: ['Emyxi', 'Azecko'],
				pointsIfCorrect: 2,
				minusPointsIfWrong: 0,
			},
			{
				questionTitle: 'Quel est le language de programmation que multiscan déteste ?',
				questionType: 'textfield',
				correctAnswer: ['javascript', 'js'],
				pointsIfCorrect: 2,
				minusPointsIfWrong: 1,
			},
		],
	},
]);

console.log('balalala');

db.createUser({
	user: 'user',
	pwd: 'Aexie3OoQu2taiqu8angoo0aighaighohquaib0io6Ahz5quooyiech4ahngoosh',
	roles: [{ role: 'readWrite', db: 'quizzoto' }],
});
