import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Question from './testQuestion';
import { useState } from 'react';

const TestPage = ({ questionBank, testName }) => {
  const [isFinished, setIsFinished] = useState(false);
  return (
    <>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '22ch' },
          width: '100%',
          marginBottom: '10rem',
        }}
        noValidate
        autoComplete="off"
      >
        <div className="w-[45rem] mx-auto my-16">
          <h1 className="text-6xl font-bold">{testName}</h1>
          {questionBank.map((question, index) => {
            return (
              <Question
                key={question.id}
                questionNum={index}
                showAnswer={isFinished}
                {...question}
              />
            );
          })}

          <div className="mt-4 ml-8 w-fit">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ color: 'white' }}
              onClick={() => {
                setIsFinished(true);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default TestPage;
