import React from 'react';

export interface InputProps {
  name: string;
  labelId: string;
  inputId: string;
  type: CustomInputType;
  label: string;
  blurFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  changeFn?: (errored: boolean) => void;
  validator?: CustomInputType;
  defaultColor?: string;
}

export type CustomInputType =
  | 'email'
  | 'money'
  | 'number'
  | 'password'
  | 'phone'
  | 'text'
  | 'zip';
