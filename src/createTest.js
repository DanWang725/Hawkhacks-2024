import { TextField, Box, Button } from '@mui/material';
import { useState, useRef } from 'react';
import UnitField from './unitField';
import { completePostTestProcess } from './api/tests';

const CreateTest = () => {
  const [numUnits, setNumUnits] = useState(1);
  const [testName, setTestName] = useState('');
  const [university, setUniversity] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const unitTitles = useRef({ 0: '' });
  const unitTexts = useRef({ 0: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    console.log(testName);
    console.log(university);
    console.log(courseCode);
    console.log(courseName);
    console.log(unitTitles.current);
    console.log(unitTexts.current);
    const data = {
      testName,
      university,
      courseCode,
      courseName,
      unitName: Object.values(unitTitles.current),
      unitContent: Object.values(unitTexts.current),
    };
    console.log(data);
    completePostTestProcess(data).then((res) => console.log(res));
  };

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
          <h1 className="text-4xl font-bold text-center">Create Test</h1>

          <div className="w-fit mx-auto mt-6 mb-4">
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

          {[...Array(numUnits).keys()].map((id, index) => (
            <UnitField
              key={id}
              index={index}
              onTitleChange={(index, value) => {
                const newUnitTitles = { ...unitTitles.current };
                newUnitTitles[index] = value;
                unitTitles.current = newUnitTitles;
              }}
              onTextChange={(index, value) => {
                const newUnitTexts = { ...unitTexts.current };
                newUnitTexts[index] = value;
                unitTexts.current = newUnitTexts;
              }}
            />
          ))}

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
          </div>
        </div>
      </Box>
    </>
  );
};

export default CreateTest;
