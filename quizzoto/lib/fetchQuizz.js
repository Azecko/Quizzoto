export default async function fetchQuizz(quizzId) {
    try {
        const response = await fetch(`http://localhost:3000/api/quizz/${quizzId}`);
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}