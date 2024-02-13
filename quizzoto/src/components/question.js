import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, TextField } from "@mui/material"

export default function Question({ question, register }) {
    switch(question.questionType) {
        case 'radios':
            return (
                <FormControl>
						{question.answers.map((e, index) => {
							return <FormControlLabel key={index} {...register(question.questionTitle)} value={e} control={<Radio />} label={e} />;
						})}
                    </RadioGroup>
                </FormControl>
            )
        case 'checkboxes':
            return (
                <FormGroup>
					{question.answers.map((e, index) => {
						return <FormControlLabel key={index} {...register(question.questionTitle)} value={e} control={<Checkbox />} label={e} />;
					})}
                </FormGroup>
            )
        case 'textfield':
            return (
                <TextField {...register(question.questionTitle)} label="Réponse ici" variant="outlined" />
            )
    }
}