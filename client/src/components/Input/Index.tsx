import React from 'react';
import { useMappedState } from 'react-use-mapped-state';

import { InputWrapper } from './Input-Components';

interface IInput {
  name: string;
  labelId: string;
  inputId: string;
  required?: boolean;
  type: CustomInputType;
  label: string;
  blurFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => boolean;
  errorMessage?: string[];
}

export type CustomInputType =
  | 'email'
  | 'money'
  | 'number'
  | 'password'
  | 'phone'
  | 'text'
  | 'zip';

export const Input: React.FC<IInput> = ({
  name,
  labelId,
  inputId,
  type,
  label,
  blurFn,
  required,
  validate,
}) => {
  const [{ userInput, error }, setState] = useMappedState({
    userInput: '',
    error: false,
  });

  const renderRequiredLabel = (): JSX.Element => (
    <span className='input-required' title='This field is required'>
      *
    </span>
  );

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = true;
    if (typeof validate === 'function') {
      isValid = validate(evt.target.value);
    }
    setState(['userInput', 'error'], [evt.target.value, isValid]);
  };

  const handleOnBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (typeof blurFn === 'function') {
      blurFn(evt);
    }
  };

  const renderInput = () => (
    <InputWrapper input={userInput} error={error}>
      <input
        type={type}
        name={name}
        id={inputId}
        value={userInput}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required={required ?? false}
      />
      <label htmlFor={name} id={labelId}>
        {label} {required ? renderRequiredLabel() : null}
      </label>
    </InputWrapper>
  );

  return <>{label ? renderInput() : null}</>;
};
