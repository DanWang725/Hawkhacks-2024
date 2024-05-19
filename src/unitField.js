import { useState } from 'react';
import { TextField } from '@mui/material';

const UnitField = ({
  className,
  index,
  onTitleChange,
  onTextChange,
  disabled,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');

  return (
    <div className={'mt-8' + className}>
      <TextField
        disabled={disabled}
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
        disabled={disabled}
        style={{ width: 'calc(100% - 16px)' }}
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
    </div>
  );
};

export default UnitField;
