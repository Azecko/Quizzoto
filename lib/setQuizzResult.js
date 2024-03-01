export default async function setQuizzResult(quizzId, userAnswers, sessionId, session) {
	try {
		const response = await fetch(`/api/setQuizzResult/${quizzId}?s=${sessionId}`, { method: 'POST', body: JSON.stringify({ answers: userAnswers, info: session }) });
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
	}
}
