import React from 'react';
import { useMappedState } from 'react-use-mapped-state';
import axios from 'axios';

import { Button } from '../Button';
import { Input } from '../Input/Index';

export const Signin: React.FC<{ handleSignInSuccess: () => void }> = ({
  handleSignInSuccess,
}) => {
  const [
    { userName, email, emailConfirm, pass, passConfirm, errored, toasterShown },
    setState,
  ] = useMappedState({
    userName: '',
    email: '',
    emailConfirm: '',
    pass: '',
    passConfirm: '',
    errored: true,
    toasterShown: false,
  });

  const handleBlur = (stateName: string, stateValue: string) => {
    setState(stateName, stateValue);
  };

  const handleOnChange = (errored: boolean) => {
    setState('errored', errored);
  };

  const onSignUp = async () => {
    const results = await axios.post('/api/auth/register', {
      email,
      user_password: pass,
      user_name: userName,
    });

    if (results.data.message === 'Successfully Registered User') {
      console.log('Success and closed and all');
      handleSignInSuccess();
    }
  };

  const fieldsMatch = (field1: string, filed2: string) => {
    return field1 === filed2;
  };

  const passwordsMatch = () => {
    return fieldsMatch(pass, passConfirm);
  };

  const emailsMatch = () => {
    return fieldsMatch(email, emailConfirm);
  };

  const signupDisabled = () => {
    const emailHasEmpty = email === '' || emailConfirm === '';
    const passHasEmpty = pass === '' || passConfirm === '';
    const userNameEmpty = userName === '';

    const passesAreMatch = passwordsMatch();
    const emailsAreMatch = emailsMatch();

    return (
      emailHasEmpty ||
      passHasEmpty ||
      userNameEmpty ||
      !passesAreMatch ||
      !emailsAreMatch
    );
  };

  return (
    <div>
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
        disabled={signupDisabled()}
        text='Sign Up'
        clickHandler={onSignUp}
      />
    </div>
  );
};
