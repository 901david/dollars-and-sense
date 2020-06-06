import * as React from 'react';
import styled from 'styled-components';
import { useMappedState } from 'react-use-mapped-state';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { SignUp } from '../SignUp/SignUp';
import { Toaster } from '../Toaster/Toaster';
import { Loader } from '../Loader/Loader';

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
  setUserAuthed: (bool: boolean) => void;
}> = ({ setUserAuthed }) => {
  let history = useHistory();
  const [
    {
      userName,
      pass,
      SignUpOpen,
      SignUpSuccess,
      toasterShown,
      emailUnconfirmed,
      emailNotFound,
      passwordWrong,
      loading,
      duplicateEmail,
    },
    setState,
  ] = useMappedState({
    userName: '',
    pass: '',
    SignUpOpen: false,
    SignUpSuccess: false,
    toasterShown: undefined,
    emailUnconfirmed: false,
    emailNotFound: false,
    passwordWrong: false,
    loading: false,
    duplicateEmail: false,
  });

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const onLogin = async () => {
    setState('loading', true);
    try {
      const {
        data: { message },
      } = await axios.post('/api/auth/confirm', {
        email: userName,
      });
      if (message === 'Email is confirmed in system') {
        const results = await axios.post('/api/auth/login', {
          email: userName,
          user_password: pass,
        });
        if (results.data.message === 'Successfully Authenticated') {
          setUserAuthed(true);
          history.push('/');
        }
      }
    } catch (err) {
      setState('loading', false);
      if (err.message === 'Request failed with status code 404') {
        setState(['toasterShown', 'emailNotFound'], [true, true]);
      }
      if (err.message === 'Request failed with status code 425') {
        setState(['toasterShown', 'emailUnconfirmed'], [true, true]);
      }

      if (err.message === 'Request failed with status code 401') {
        setState(['toasterShown', 'passwordWrong'], [true, true]);
      }
    }
  };

  const handleSignUpTrigger = () => {
    setState('SignUpOpen', !SignUpOpen);
  };

  const handleSignUpSuccess = () => {
    setState(
      ['SignUpOpen', 'toasterShown', 'SignUpSuccess'],
      [false, true, true]
    );
  };

  const userMessageEmailNeedsConfirmation =
    'Please check your email for a confirmation email.  You must confirm your email to login.';

  const userMessageEmailNotFound = 'Email or Password not correct.';

  const duplicateEmailMessage =
    'Email already exists in system. Please choose another or log in if you already have an account';

  const getMessageColor = () => {
    if (SignUpSuccess) return 'success';
    if (emailNotFound || passwordWrong || duplicateEmail) return 'alert';
    if (emailUnconfirmed) return 'warning';
    return 'success';
  };

  const getMessage = () => {
    if (SignUpSuccess || emailUnconfirmed)
      return userMessageEmailNeedsConfirmation;
    if (duplicateEmail) return duplicateEmailMessage;
    return userMessageEmailNotFound;
  };

  const dismissToaster = () =>
    setState(
      [
        'toasterShown',
        'SignUpSuccess',
        'emailNotFound',
        'emailUnconfirmed',
        'passwordWrong',
        'duplicateEmail',
      ],
      [false, false, false, false, false, false]
    );

  const duplicateEmailTriggered = () => {
    setState(['toasterShown', 'duplicateEmail'], [true, true]);
  };

  const errored = userName === '' || pass === '';

  return (
    <>
      <Loader loading={loading} />
      <Toaster
        dismissFn={dismissToaster}
        dismissible={true}
        triggered={toasterShown}
        message={getMessage()}
        time={5000}
        type={getMessageColor()}
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
            required={true}
          />
          <Input
            name='password'
            labelId='password_label'
            inputId='password_input'
            type='password'
            label='Password'
            blurFn={evt => handleBlur('pass', evt.target.value)}
            required={true}
          />
          <Button
            ariaLabel='Log in'
            disabled={errored}
            text='Login'
            clickHandler={onLogin}
          />
          <div className='sign-up'>
            <p>
              Don't have an account yet?{' '}
              <span onClick={handleSignUpTrigger}>Sign up Here!</span>
            </p>
          </div>
        </div>
      </LoginWrapper>
      <Modal open={SignUpOpen} toggle={handleSignUpTrigger}>
        <SignUp
          duplicateEmailTriggered={duplicateEmailTriggered}
          triggerLoader={(trigger: boolean) => setState('loading', trigger)}
          handleSignUpSuccess={handleSignUpSuccess}
        />
      </Modal>
    </>
  );
};
