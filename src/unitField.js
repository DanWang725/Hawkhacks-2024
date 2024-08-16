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

  const CHARACTER_LIMIT = 10000;

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
          var str = e.target.value;
          if (e.target.value.length > 20) str = str.substring(0, 20);
          setTitleValue(str);
          onTitleChange(index, str);
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
        maxRows={30}
        inputProps={{
          maxLength: CHARACTER_LIMIT,
        }}
        value={textValue}
        onChange={(e) => {
          var str = e.target.value;
          if (e.target.value.length > CHARACTER_LIMIT)
            str = str.substring(0, CHARACTER_LIMIT - 1);
          setTextValue(str);
          onTextChange(index, str);
        }}
      />

      <div className="flex justify-end text-sm text-gray-400 px-3 mt-[-4px]">
        <p>{`${textValue.length}/${CHARACTER_LIMIT}`}</p>
      </div>
    </div>
  );
};

export default UnitField;
