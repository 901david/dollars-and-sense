import * as React from 'react';
import styled from 'styled-components';
import { useMappedState } from 'react-use-mapped-state';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

export const Login: React.FC<{
  setUserAuthed: () => void;
}> = ({ setUserAuthed }) => {
  let history = useHistory();
  const [{ userName, pass, errored }, setState] = useMappedState({
    userName: '',
    pass: '',
    errored: true,
  });

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const handleOnChange = (errored: boolean) => {
    setState('errored', errored);
  };

  const onLogin = async () => {
    const {
      data: { message },
    } = await axios.post('/api/auth/login', {
      email: userName,
      user_password: pass,
    });

    if (message === 'Successfully Authenticated') {
      setUserAuthed();
      history.push('/');
    }
  };

  const triggerSignUp = () => {
    //Triggger modal here
  };

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
          changeFn={handleOnChange}
          required={true}
          validator={'email'}
        />
        <Input
          name='password'
          labelId='password_label'
          inputId='password_input'
          type='password'
          label='Password'
          changeFn={handleOnChange}
          blurFn={evt => handleBlur('pass', evt.target.value)}
          required={true}
          validator={'password'}
        />
        <Button disabled={errored} text='Login' clickHandler={onLogin} />
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
