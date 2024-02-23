export default async function fetchQuizzs() {
	try {
		const response = await fetch(`/api/quizzs`);
		const jsonData = await response.json();
		console.log(jsonData);
		return jsonData;
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
	}
}
