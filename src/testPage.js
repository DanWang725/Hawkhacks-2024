import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Question from './testQuestion';

const TestPage = () => {
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
          <h1 className="text-6xl font-bold">Test Name</h1>
          <h2 className="text-3xl mt-8">Unit x: Name</h2>

          <Question
            questionNum={1}
            question="Who is the most Abungy Mungy?"
            options={['Joel', 'Daniel Amongstusus', 'Kirisan', 'Myron (fish)']}
          />

          <Question
            questionNum={2}
            question="Who is the least Abungy Mungy?"
            options={['Joel', 'Daniel Amongstusus', 'Kirisan', 'Myron (fish)']}
          />

          <div className="mt-4 ml-8 w-fit">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ color: 'white' }}
            >
              Submit
            </Button>
          </div>

          {/* {[...Array(4).keys()].map((id, index) => (
            
          ))} */}

          {/*<div className="w-fit mx-auto mt-6 mb-4">
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' } }}>
              <TextField
                required
                id="testName"
                label="Test Name"
                variant="standard"
                onChange={(e) => setTestName(e.target.value)}
              />
            </Box>
          </div>

          <div className="w-fit mx-auto mt-4 mb-10">
            <TextField
              required
              id="university"
              label="University"
              onChange={(e) => setUniversity(e.target.value)}
              variant="standard"
            />
            <TextField
              required
              id="courseCode"
              label="Course Code"
              onChange={(e) => setCourseCode(e.target.value)}
              variant="standard"
            />
            <TextField
              id="courseName"
              label="Course Name"
              variant="standard"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div className="w-full mt-2 flex">
            <div className="ml-[8px] w-fit flex">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setNumUnits(numUnits + 1);
                }}
              >
                Add New Unit
              </Button>
            </div>

            <div className="mr-[8px] ml-auto w-fit">
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ color: 'white' }}
              >
                Submit
              </Button>
            </div>
          </div> */}
        </div>
      </Box>
    </>
  );
};

export default TestPage;
