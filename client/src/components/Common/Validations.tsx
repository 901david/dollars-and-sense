import { CustomInputType } from '../Input/Index';

type ValidatorsMap = Map<
  CustomInputType,
  (value: CustomInputType) => { isValid: boolean; errors: string[] }
>;

const passwordWithValidChars = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (value: string) => {
  const isInvalid = emailValidation.exec(value) !== null;

  const errors: string[] = [];
  if (!isInvalid) errors.push('Email must contain an @ and a . to be valid');
  return { isValid: !isInvalid, errors };
};

const validatePassword = (value: CustomInputType) => {
  const hasValidChars = passwordWithValidChars.test(value);
  const isOfLength = value.length > 7;

  const errors: string[] = [];

  if (!hasValidChars)
    errors.push(
      'Password must contain Uppercase, Lowercase, Symbols and Numbers'
    );

  if (!isOfLength) errors.push('Password must be at least 8 characters');

  return { isValid: !hasValidChars || !isOfLength, errors };
};

const validatorMap: ValidatorsMap = new Map();

validatorMap.set('email', validateEmail);
validatorMap.set('password', validatePassword);

export const getValidator = (vKey: CustomInputType) => {
  return validatorMap.get(vKey);
};
