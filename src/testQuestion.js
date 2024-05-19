import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const Question = ({ questionNum, question, options }) => {
  return (
    <div className="my-4">
      <h1 className="text-xl mb-2">
        {questionNum}: {question}
      </h1>

      <div className="ml-8">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name={'question' + toString(questionNum)}
          >
            <FormControlLabel
              value="option0"
              control={<Radio />}
              label={options[0]}
            />
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label={options[1]}
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label={options[2]}
            />
            <FormControlLabel
              value="option3"
              control={<Radio />}
              label={options[3]}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default Question;
