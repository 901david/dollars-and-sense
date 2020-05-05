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
  changeFn?: (errored: boolean) => void;
  validator?: CustomInputType;
  defaultColor?: string;
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
  changeFn,
  defaultColor,
}) => {
  const [{ userInput, error, errors }, setState] = useMappedState({
    userInput: '',
    error: false,
    errors: [],
  });

  const renderRequiredLabel = (): JSX.Element => (
    <span className='input-required' title='This field is required'>
      *
    </span>
  );

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = false;
    let errors: string[] = [];

    if (validator !== undefined || validator !== '') {
      const validatorFN = getValidator(validator as CustomInputType);
      if (validatorFN) {
        const { isValid: valid, errors: errs } = validatorFN(
          evt.target.value as CustomInputType
        );
        isValid = valid;
        errors = errs;
      }
    }

    setState(
      ['userInput', 'error', 'errors'],
      [evt.target.value, isValid, errors]
    );

    if (typeof changeFn === 'function') {
      changeFn(isValid);
    }
  };

  const handleOnBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    if (typeof blurFn === 'function') {
      blurFn(evt);
    }
  };

  const inputTitle = errors.length > 0 ? errors.join(', ') : '';

  const renderInput = () => (
    <InputWrapper defaultColor={defaultColor} input={userInput} error={error}>
      <input
        title={inputTitle}
        type={type}
        name={name}
        id={inputId}
        value={userInput}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        required={required ?? false}
      />
      <label htmlFor={name} id={labelId} title={inputTitle}>
        {label} {required ? renderRequiredLabel() : null}
      </label>
    </InputWrapper>
  );

  return <>{label ? renderInput() : null}</>;
};
