import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"

export default function Question({ question }) {
    switch(question.questionType) {
        case 'radios':
            return (
                <FormControl>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        {
                            question.answers.map(e => {
                                return (
                                    <FormControlLabel value={e} control={<Radio />} label={e} />
                                )
                            })
                        }
                    </RadioGroup>
                </FormControl>
            )
    }
}