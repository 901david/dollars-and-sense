import * as React from 'react';
import styled from 'styled-components';

import { Input } from '../Input/Index';

const LoginWrapper = styled.main`
  background: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    width: 40vw;
  }
`;

export const Login = () => (
  <LoginWrapper>
    <div className='login-container'>
      <Input
        name='email'
        labelId='email_label'
        inputId='email_input'
        type='text'
        label='Email'
        blurFn={() => ({})}
        changeFn={() => ({})}
        userInput=''
      />
      <Input
        name='password'
        labelId='password_label'
        inputId='password_input'
        type='password'
        label='Password'
        blurFn={() => ({})}
        changeFn={() => ({})}
        userInput=''
      />
    </div>
  </LoginWrapper>
);
