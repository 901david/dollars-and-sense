import { CustomInputType } from '../Input/Index';

type ValidatorsMap = Map<CustomInputType, Function>;

const passwordWithValidChars = new RegExp('[A-Za-z0-9!@#$%^&*]+', 'g');
const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (value: string) => {
  console.log(value, emailValidation.exec(value));
  return !!!emailValidation.exec(value);
};

const validatePassword = (value: CustomInputType) => {
  const hasValidChars = passwordWithValidChars.test(value);
  const isOfLength = value.length > 7;
  console.log(value);
  console.log('hasValidChars', hasValidChars);
  console.log('isOfLength', isOfLength);

  return !hasValidChars || !isOfLength;
};

const validatorMap: ValidatorsMap = new Map([
  ['email' as CustomInputType, validateEmail],
  ['password' as CustomInputType, validatePassword],
]);

export const getValidator = (vKey: CustomInputType) => {
  return validatorMap.get(vKey);
};
