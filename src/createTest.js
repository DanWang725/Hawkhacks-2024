import { TextField, Box, Button } from '@mui/material';
import Navbar from './navbar';
import { useState, useRef } from 'react';

const UnitField = ({
  className,
  index,
  uuid,
  numUnits,
  setNumUnits,
  onTitleChange,
  onTextChange,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');
  console.log('rendered unit:', index, 'with uuid:', uuid);

  return (
    <div className={'mt-8' + className}>
      <TextField
        required
        id="unitTitle"
        label="Unit Title"
        variant="standard"
        value={titleValue}
        onChange={(e) => {
          setTitleValue(e.target.value);
          onTitleChange(index, e.target.value);
        }}
      />

      <TextField
        multiline
        style={{ width: '100%' }}
        className="text-sm leading-normal p-3 rounded-xl rounded-br-none shadow-lg shadow-slate-100 focus:shadow-outline-primary focus:shadow-lg border border-solid hover:border-primary focus:border-primary bg-white focus-visible:outline-0 box-border"
        aria-label="Your notes here"
        placeholder="Your Notes Here..."
        minRows={10}
        maxRows={15}
        value={textValue}
        onChange={(e) => {
          setTextValue(e.target.value);
          onTextChange(index, e.target.value);
        }}
      />

      {index === numUnits - 1 ? (
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

          {[...Array(numUnits).keys()].map((id, index) => (
            <UnitField
              key={id}
              index={index}
              uuid={id}
              numUnits={numUnits}
              setNumUnits={setNumUnits}
              onTitleChange={(index, value) => {
                console.log('Title Change:', index, value);
                const newUnitTitles = { ...unitTitles };
                newUnitTitles[index] = value;
                unitTitles.current = newUnitTitles;
                console.log(unitTitles);
              }}
              onTextChange={(index, value) => {
                console.log('Text Change:', index, value);
                const newUnitTexts = { ...unitTexts };
                newUnitTexts[index] = value;
                unitTexts.current = newUnitTexts;
                console.log(unitTexts);
              }}
            />
          ))}
        </div>
      </Box>
    </>
  );
};

export default CreateTest;
