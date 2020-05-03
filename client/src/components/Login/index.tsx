import * as React from 'react';
import styled from 'styled-components';
import { useMappedState } from 'react-use-mapped-state';

import { Input } from '../Input/Index';
import { Button } from '../Button/index';
import { emailValidation } from '../Common/constants';

const LoginWrapper = styled.main`
  background: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .sign-up {
    color: white;
    display: flex;

    span {
      color: lightblue;
      cursor: pointer;
    }
  }
`;

export const Login = () => {
  const [{ userName, pass }, setState] = useMappedState({
    userName: '',
    pass: '',
  });
  let emailValidationThrottler: any = null;

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const triggerSignUp = () => {
    //Triggger modal here
  };

  const handleEmailValidation = (value: string): any => {
    return !!!emailValidation.exec(value);
  };

  const handlePasswordValidation = (value: string): any => {
    const capsExist = new RegExp('[A-Z]', 'g');
    const lowersExist = new RegExp('[a-z]', 'g');
    const numbersExist = new RegExp('[0-9]', 'g');
    const symbolsExist = new RegExp('[!@#$%^&*]', 'g');
    const hasCaps = capsExist.exec(value);
    const hasLowers = lowersExist.exec(value);
    const hasNumbers = numbersExist.exec(value);
    const hasSymbols = symbolsExist.exec(value);
    const isOfLength = value.length > 7;
    return (
      !!!hasCaps ||
      !!!hasLowers ||
      !!!hasNumbers ||
      !!!hasSymbols ||
      !!!hasSymbols ||
      !!!isOfLength
    );
  };

  const isFilledOut = userName !== '' && pass !== '';
  console.log('isFilledOut', isFilledOut);
  return (
    <LoginWrapper>
      <div className='login-container'>
        <Input
          name='email'
          labelId='email_label'
          inputId='email_input'
          type='text'
          label='Email'
          blurFn={evt => handleBlur('userName', evt.target.value)}
          required={true}
          validate={handleEmailValidation}
        />
        <Input
          name='password'
          labelId='password_label'
          inputId='password_input'
          type='password'
          label='Password'
          blurFn={evt => handleBlur('pass', evt.target.value)}
          required={true}
          validate={handlePasswordValidation}
        />
        <Button
          disabled={!isFilledOut}
          text='Login'
          clickHandler={data => console.log(data)}
        />
        <div className='sign-up'>
          <p>
            Don't have an account yet?{' '}
            <span onClick={triggerSignUp}>Sign up Here!</span>
          </p>
        </div>
      </div>
    </LoginWrapper>
  );
};
