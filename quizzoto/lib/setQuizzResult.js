export default async function setQuizzResult(quizzId, userAnswers) {
    try {
        const response = await fetch(`http://localhost:3000/api/setQuizzResult/${quizzId}`, { method: 'POST', body: JSON.stringify(userAnswers)});
        const jsonData = await response.json();
        return jsonData
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}