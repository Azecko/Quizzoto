export default async function fetchQuizz(quizzId, questionId) {
	if (questionId == 0) {
		questionId = 1;
	}
	try {
		const response = await fetch(`/api/quizz/${quizzId}?q=${questionId}`);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
	}
}
