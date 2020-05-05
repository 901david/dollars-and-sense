import * as React from 'react';
import styled from 'styled-components';
import { useMappedState } from 'react-use-mapped-state';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Input } from '../Input/Index';
import { Button } from '../Button/index';
import { Modal } from '../Modal';
import { Signin } from '../Signin';
import { Toaster } from '../Toaster';

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
  const [
    {
      userName,
      pass,
      errored,
      signInOpen,
      signInSuccess,
      toasterShown,
      emailUnconfirmed,
      emailNotFound,
    },
    setState,
  ] = useMappedState({
    userName: '',
    pass: '',
    errored: true,
    signInOpen: false,
    signInSuccess: false,
    toasterShown: false,
    emailUnconfirmed: false,
    emailNotFound: false,
  });

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const handleOnChange = (errored: boolean) => {
    setState('errored', errored);
  };

  const onLogin = async () => {
    try {
      const {
        data: { message },
      } = await axios.post('/api/auth/confirm', {
        email: userName,
      });
      console.log('MESSAGE', message);
      if (message === 'Email is confirmed in system') {
        const results = await axios.post('/api/auth/login', {
          email: userName,
          user_password: pass,
        });
        if (results.data.message === 'Successfully Authenticated') {
          setUserAuthed();
          history.push('/');
        }
      }
    } catch (err) {
      console.log(err.message);
      if (err.message === 'Request failed with status code 404') {
        setState(['toasterShown', 'emailNotFound'], [true, true]);
      }
      if (err.message === 'Request failed with status code 425') {
        setState(['toasterShown', 'emailUnconfirmed'], [true, true]);
      }
    }
  };

  const handleSignInTrigger = () => {
    setState('signInOpen', !signInOpen);
  };

  const handleSignInSuccess = () => {
    setState(
      ['signInOpen', 'toasterShown', 'signInSuccess'],
      [false, true, true]
    );
  };

  const userMessageEmailNeedsConfirmation =
    'Please check your email for a confirmation email.  You must confirm your email to login.';

  const userMessageEmailNotFound =
    'Email not found. Please check your email address or sign up.';

  return (
    <>
      <Toaster
        dismissFn={() => setState('toasterShown', false)}
        dismissible={true}
        triggered={toasterShown}
        message={
          signInSuccess || emailUnconfirmed
            ? userMessageEmailNeedsConfirmation
            : userMessageEmailNotFound
        }
        time={5000}
        type={
          signInSuccess ? 'success' : emailUnconfirmed ? 'warning' : 'alert'
        }
      />

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
              <span onClick={handleSignInTrigger}>Sign up Here!</span>
            </p>
          </div>
        </div>
      </LoginWrapper>
      <Modal open={signInOpen} toggle={handleSignInTrigger}>
        <Signin handleSignInSuccess={handleSignInSuccess} />
      </Modal>
    </>
  );
};
