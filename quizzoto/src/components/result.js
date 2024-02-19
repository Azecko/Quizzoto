import TableCell from '@mui/material/TableCell';

export default function Result({ result }) {
	if (result.userAnswer == null || result.userAnswer == false || result.userAnswer.length == 0) {
		result.userAnswer = 'Aucune';
	}

	function ifWrong(result) {
		switch (typeof result.correctAnswer) {
			case 'string':
				return (
					<>
						<TableCell align="right">{result.correctAnswer}</TableCell>
					</>
				);
			case 'object':
				return (
					<>
						<TableCell align="right">
							{result.correctAnswer.map((e, index) => {
								return <span key={index}>{e}, </span>;
							})}
						</TableCell>
					</>
				);
		}
	}

	switch (typeof result.userAnswer) {
		case 'string':
			return (
				<>
					<TableCell align="right">{result.userAnswer}</TableCell>
					{!result.answeredCorrectly ? ifWrong(result) : <TableCell align="right"></TableCell>}
				</>
			);
		case 'object':
			return (
				<>
					<TableCell align="right">
						{result.userAnswer.map((e, index) => {
							return <span key={index}>{e}, </span>;
						})}
					</TableCell>
					{!result.answeredCorrectly ? ifWrong(result) : <TableCell align="right"></TableCell>}
				</>
			);
	}
}
