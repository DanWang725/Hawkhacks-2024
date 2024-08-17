import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

const Question = ({
  questionNum,
  question,
  options,
  justification,
  showAnswer = false,
  answer,
}) => {
  const finalOptions = options.map((option, index) => {
    if (answer === index && showAnswer) {
      return option + ' (Correct Answer)';
    } else {
      return option;
    }
  });
  return (
    <div className="my-4">
      <h1 className="text-xl mb-2">
        {questionNum + 1}: {question}
      </h1>

      <div className="ml-8">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name={'question' + toString(questionNum)}
          >
            <FormControlLabel
              disabled={showAnswer && answer !== 0}
              value="option0"
              control={<Radio />}
              label={finalOptions[0]}
            />
            <FormControlLabel
              disabled={showAnswer && answer !== 1}
              value="option1"
              control={<Radio />}
              label={finalOptions[1]}
            />
            <FormControlLabel
              disabled={showAnswer && answer !== 2}
              value="option2"
              control={<Radio />}
              label={finalOptions[2]}
            />
            <FormControlLabel
              disabled={showAnswer && answer !== 3}
              value="option3"
              control={<Radio />}
              label={finalOptions[3]}
            />
          </RadioGroup>
        </FormControl>
        {showAnswer && <p className="mt-2">{justification}</p>}
      </div>
    </div>
  );
};

export default Question;
