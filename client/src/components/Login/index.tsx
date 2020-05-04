import * as React from 'react';
import styled from 'styled-components';
import { useMappedState } from 'react-use-mapped-state';

import { Input } from '../Input/Index';
import { Button } from '../Button/index';

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

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const triggerSignUp = () => {
    //Triggger modal here
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
          validator={'email'}
        />
        <Input
          name='password'
          labelId='password_label'
          inputId='password_input'
          type='password'
          label='Password'
          blurFn={evt => handleBlur('pass', evt.target.value)}
          required={true}
          validator={'password'}
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
