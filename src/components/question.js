import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField, Input } from '@mui/material';

export default function Question({ question, register, questionId }) {
	questionId = questionId.toString();
	switch (question.questionType) {
		case 'radios':
			return (
				<FormControl>
					<RadioGroup aria-labelledby="radio-buttons-group-label" name="radio-buttons-group">
						{question.answers.map((e, index) => {
							return <FormControlLabel {...register(questionId)} key={index} value={e} control={<Radio />} label={e} />;
						})}
					</RadioGroup>
				</FormControl>
			);
		case 'checkboxes':
			return (
				<FormGroup>
					{question.answers.map((e, index) => {
						return <FormControlLabel {...register(questionId)} key={index} value={e} control={<Checkbox />} label={e} />;
					})}
				</FormGroup>
			);
		case 'textfield':
			return <TextField {...register(questionId)} label="Réponse ici" variant="outlined" />;
	}
}
