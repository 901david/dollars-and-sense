import React from 'react';
import { useMappedState } from 'react-use-mapped-state';

import { InputWrapper } from './Input-Components';
import { getValidator } from '../Common/Validations';

interface IInputProps {
  name: string;
  labelId: string;
  inputId: string;
  required?: boolean;
  type: CustomInputType;
  label: string;
  blurFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator?: CustomInputType;
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

export const Input: React.FC<IInputProps> = ({
  name,
  labelId,
  inputId,
  type,
  label,
  blurFn,
  required,
  validator,
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
    if (validator !== undefined || validator !== '') {
      const validatorFN = getValidator(validator as CustomInputType);
      if (validatorFN) {
        isValid = validatorFN(evt.target.value as CustomInputType);
      }
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
