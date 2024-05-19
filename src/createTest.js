import { TextField, Box, Button } from '@mui/material';
import Navbar from './navbar';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UnitField = ({ className, isNewest, numUnits, setNumUnits }) => {
  return (
    <div className={'mt-8' + className}>
      <TextField
        required
        id="unitTitle"
        label="Unit Title"
        variant="standard"
      />

      <TextField
        multiline
        style={{ width: '100%' }}
        className="text-sm leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-primary focus:shadow-lg border border-solid hover:border-primary focus:border-primary bg-white focus-visible:outline-0 box-border"
        aria-label="Your notes here"
        placeholder="Your Notes Here..."
        minRows={10}
        maxRows={15}
      />

      {isNewest ? (
        <div className="w-fit mx-auto">
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
      ) : null}
    </div>
  );
};

const CreateTest = () => {
  const [numUnits, setNumUnits] = useState(1);

  return (
    <>
      <Navbar />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          width: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <div className="w-[45rem] mx-auto my-8">
          <div>
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

          <div>
            <TextField
              required
              id="courseCode"
              label="Course Code"
              variant="standard"
            />
            <TextField id="courseName" label="Course Name" variant="standard" />
          </div>

          {Array.from({ length: numUnits }, () => uuidv4()).map((id, index) => (
            <UnitField
              key={id}
              isNewest={index === numUnits - 1}
              numUnits={numUnits}
              setNumUnits={setNumUnits}
            />
          ))}
        </div>
      </Box>
    </>
  );
};

export default CreateTest;
