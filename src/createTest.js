import { TextField, Box, Button } from '@mui/material';
import Navbar from './navbar';
import { useState, useRef } from 'react';
import UnitField from './unitField';

const CreateTest = () => {
  const [numUnits, setNumUnits] = useState(1);
  const unitTitles = useRef({ 0: '' });
  const unitTexts = useRef({ 0: '' });

  return (
    <>
      <Navbar />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          width: '100%',
          marginBottom: '10rem',
        }}
        noValidate
        autoComplete="off"
      >
        <div className="w-[45rem] mx-auto my-16">
          <h1 className="text-4xl font-bold text-center">Create Test</h1>

          <div className="w-fit mx-auto mt-6 mb-4">
            <TextField
              required
              id="testName"
              label="Test Name"
              variant="standard"
            />
            <TextField
              required
              id="university"
              label="University"
              variant="standard"
            />
          </div>

          <div className="w-fit mx-auto mt-4 mb-8">
            <TextField
              required
              id="courseCode"
              label="Course Code"
              variant="standard"
            />
            <TextField id="courseName" label="Course Name" variant="standard" />
          </div>

          {[...Array(numUnits).keys()].map((id, index) => (
            <UnitField
              key={id}
              index={index}
              onTitleChange={(index, value) => {
                const newUnitTitles = { ...unitTitles };
                newUnitTitles[index] = value;
                unitTitles.current = newUnitTitles;
              }}
              onTextChange={(index, value) => {
                const newUnitTexts = { ...unitTexts };
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
