import React from 'react';
import { useMappedState } from 'react-use-mapped-state';
import axios from 'axios';
import styled from 'styled-components';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const SignUpWrapper = styled.div`
  .errored {
    border-bottom: solid 5px red;
  }
`;

interface ISigninProps {
  handleSignUpSuccess: () => void;
  triggerLoader: (trigger: boolean) => void;
  duplicateEmailTriggered: () => void;
}

export const SignUp: React.FC<ISigninProps> = ({
  handleSignUpSuccess,
  triggerLoader,
  duplicateEmailTriggered,
}) => {
  const signUpWrapper = React.useRef<HTMLDivElement | null>(null);
  const [
    { userName, email, emailConfirm, pass, passConfirm, errored },
    setState,
  ] = useMappedState({
    userName: '',
    email: '',
    emailConfirm: '',
    pass: '',
    passConfirm: '',
    errored: true,
  });

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const handleOnChange = (errored: boolean) => {
    setState('errored', errored);
  };

  const onSignUp = async () => {
    try {
      triggerLoader(true);
      const results = await axios.post('/api/auth/register', {
        email,
        user_password: pass,
        user_name: userName,
      });

      if (results.data.message === 'Successfully Registered User') {
        triggerLoader(false);
        handleSignUpSuccess();
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 409') {
        triggerLoader(false);
        duplicateEmailTriggered();
      }
    }
  };

  const signupDisabled = () => {
    const emailHasEmpty = email === '' || emailConfirm === '';
    const passHasEmpty = pass === '' || passConfirm === '';
    const userNameEmpty = userName === '';

    return emailHasEmpty || passHasEmpty || userNameEmpty || errored;
  };

  React.useEffect(() => {
    if (pass !== '' && passConfirm !== '' && pass !== passConfirm) {
      signUpWrapper.current
        ?.querySelector('input[name="password"]')
        ?.classList.add('errored');
      signUpWrapper.current
        ?.querySelector('input[name="password_confirm"]')
        ?.classList.add('errored');
    } else {
      signUpWrapper.current
        ?.querySelector('input[name="password"]')
        ?.classList.remove('errored');
      signUpWrapper.current
        ?.querySelector('input[name="password_confirm"]')
        ?.classList.remove('errored');
    }
  }, [pass, passConfirm]);

  React.useEffect(() => {
    if (email !== '' && emailConfirm !== '' && email !== emailConfirm) {
      signUpWrapper.current
        ?.querySelector('input[name="email"]')
        ?.classList.add('errored');
      signUpWrapper.current
        ?.querySelector('input[name="email_confirm"]')
        ?.classList.add('errored');
    } else {
      signUpWrapper.current
        ?.querySelector('input[name="email"]')
        ?.classList.remove('errored');
      signUpWrapper.current
        ?.querySelector('input[name="email_confirm"]')
        ?.classList.remove('errored');
    }
  }, [email, emailConfirm]);

  return (
    <>
      <SignUpWrapper ref={signUpWrapper}>
        <h4>Sign Up</h4>
        <Input
          name='user_name'
          labelId='user_name_label'
          inputId='user_name_input'
          type='text'
          label='User Name'
          blurFn={evt => handleBlur('userName', evt.target.value)}
          changeFn={handleOnChange}
          required={true}
          defaultColor='black'
        />
        <Input
          name='email'
          labelId='email_label'
          inputId='email_input'
          type='text'
          label='Email'
          blurFn={evt => handleBlur('email', evt.target.value)}
          changeFn={handleOnChange}
          required={true}
          validator={'email'}
          defaultColor='black'
        />
        <Input
          name='email_confirm'
          labelId='email_confirm_label'
          inputId='email_confirm_input'
          type='text'
          label='Confirm Email'
          blurFn={evt => handleBlur('emailConfirm', evt.target.value)}
          changeFn={handleOnChange}
          required={true}
          validator={'email'}
          defaultColor='black'
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
          defaultColor='black'
        />
        <Input
          name='password_confirm'
          labelId='password_confirm_label'
          inputId='password_confirm_input'
          type='password'
          label='Confirm Password'
          changeFn={handleOnChange}
          blurFn={evt => handleBlur('passConfirm', evt.target.value)}
          required={true}
          validator={'password'}
          defaultColor='black'
        />
        <Button
          ariaLabel='Sign up'
          disabled={signupDisabled()}
          text='Sign Up'
          clickHandler={onSignUp}
        />
      </SignUpWrapper>
    </>
  );
};
