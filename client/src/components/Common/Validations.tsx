import { CustomInputType } from '../Input/Input.types';

type ValidatorsMap = Map<
  CustomInputType,
  (value: string) => { isValid: boolean; errors: string[] }
>;

const passwordWithValidChars = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const validateEmail = (value: string) => {
  let isValid = true;
  const atIdentifierIdx = value.indexOf('@');
  if (atIdentifierIdx === -1) isValid = false;
  const hasTextBeforeAt = atIdentifierIdx - 1 > -1;
  if (!hasTextBeforeAt) isValid = false;
  const dotIdentifierIdx = value.indexOf('.');
  if (dotIdentifierIdx === -1) isValid = false;
  const atBeforeDotAndTextBetween = atIdentifierIdx + 1 < dotIdentifierIdx;
  if (!atBeforeDotAndTextBetween) isValid = false;
  const dotHasTextAfterIt = dotIdentifierIdx + 1 < value.length;
  if (!dotHasTextAfterIt) isValid = false;

  const errors: string[] = [];
  if (!isValid) errors.push('Email must contain an @ and a . to be valid');
  return { isValid, errors };
};

const validatePassword = (value: string) => {
  const hasValidChars = passwordWithValidChars.test(value);
  const isOfLength = value.length > 7;

  const errors: string[] = [];

  if (!hasValidChars)
    errors.push(
      'Password must contain Uppercase, Lowercase, Symbols and Numbers'
    );

  if (!isOfLength) errors.push('Password must be at least 8 characters');

  return { isValid: hasValidChars || !isOfLength, errors };
};

const validatorMap: ValidatorsMap = new Map();

validatorMap.set('email', validateEmail);
validatorMap.set('password', validatePassword);

export const getValidator = (vKey: CustomInputType) => {
  return validatorMap.get(vKey);
};
