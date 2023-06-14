export default async function fetchResult(resultId) {
    try {
        const response = await fetch(`http://localhost:3000/api/result/${resultId}`);
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}