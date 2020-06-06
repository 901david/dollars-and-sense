import React from 'react';
import { useMappedState } from 'react-use-mapped-state';

import { InputWrapper } from './Input.styles';
import { getValidator } from '../Common/Validations';

export interface InputProps {
  name: string;
  labelId: string;
  inputId: string;
  type: CustomInputType;
  label: string;
  blurFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
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

export const Input: React.FC<InputProps> = ({
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
    errors: new Set<string>(),
  });

  const renderRequiredLabel = (): JSX.Element => (
    <span className='input-required' title='This field is required'>
      *
    </span>
  );

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let isValid = true;
    let newErrors = errors || new Set<string>();
    if (validator !== undefined || validator !== '') {
      const validatorFN = getValidator(validator as CustomInputType);
      if (validatorFN) {
        const { isValid: valid, errors: errs } = validatorFN(
          evt.target.value as CustomInputType
        );
        isValid = valid;
        errs.forEach(err => newErrors.add(err));
      }
    }
    setState(
      ['userInput', 'error', 'errors'],
      [evt.target.value, !isValid, newErrors]
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

  const inputTitle = errors.size > 0 ? Array.from(errors).join(', ') : '';

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
        required={required === undefined ? false : required}
        aria-required={required === undefined ? false : required}
      />
      <label htmlFor={inputId} id={labelId} title={inputTitle}>
        {label} {required ? renderRequiredLabel() : null}
      </label>
    </InputWrapper>
  );

  return <>{label ? renderInput() : null}</>;
};
