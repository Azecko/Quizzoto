export default function Result({ result }) {
    if(result.userAnswer == null || result.userAnswer == false || result.userAnswer.length == 0) {
        result.userAnswer = 'Aucune';
    }

    function ifWrong(result) {
        switch (typeof(result.correctAnswer)) {
            case 'string':
                return (
                    <div>
                        <h3>Réponse correcte :</h3> {result.correctAnswer}
                    </div>
                )
            case 'object':
                return (
                    <div>
                        <h3>Réponse correcte :</h3>
                        <ul>
                            {result.correctAnswer.map(e => { return <li>{e}</li> })}
                        </ul>
                    </div>
                )
        }
    }

    switch(typeof(result.userAnswer)) {
        case 'string':
            return (
                <div>
                    <h4>Votre réponse :</h4> {result.userAnswer}
                    {!result.answeredCorrectly && ifWrong(result)}
                </div>
            )
        case 'object':
            return (
                <div>
                    <h4>Votre réponse :</h4>
                    <ul>
                        {result.userAnswer.map(e => { return <li>{e}</li> })}
                    </ul>
                    {!result.answeredCorrectly && ifWrong(result)}
                </div>
            )
    }
}