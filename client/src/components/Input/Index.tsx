import React from 'react';

import { InputWrapper } from './Input-Components';

interface IInput {
  name: string;
  labelId: string;
  inputId: string;
  type: string;
  label: string;
  blurFn: (val: string) => void;
  changeFn: (val: string, name: string) => void;
  userInput: string;
}

export const Input: React.FC<IInput> = ({
  name,
  labelId,
  inputId,
  type,
  label,
  blurFn,
  changeFn,
  userInput,
}) => {
  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof changeFn === 'function') {
      changeFn(evt.target.value, evt.target.name);
    }
  };

  const handleOnBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (typeof blurFn === 'function') {
      blurFn(evt.target.name);
    }
  };

  return (
    <InputWrapper input={userInput}>
      <input
        type={type}
        name={name}
        id={inputId}
        value={userInput}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <label htmlFor={name} id={labelId}>
        {label}
      </label>
    </InputWrapper>
  );
};
