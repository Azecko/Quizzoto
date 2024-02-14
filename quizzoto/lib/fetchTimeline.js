export default async function fetchTimeline(quizzId) {
	try {
		const response = await fetch(`/api/quizz/${quizzId}?q=timeline`);
		const jsonData = await response.json();
		console.log('fetchTimeline');
		return jsonData;
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
	}
}
