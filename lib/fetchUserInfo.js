export default async function fetchUserInfo(url) {
	try {
		const response = await fetch(url);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.error('Erreur lors de la récupération des données:', error);
	}
}
