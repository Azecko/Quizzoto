export default async function fetchSession(sessionId) {
	try {
		const response = await fetch(`/api/session/${sessionId}`);
		const jsonData = await response.json();
		console.log(jsonData);
		return jsonData;
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
	}
}
