import React from 'react';
import { CustomButton } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  text,
  clickHandler,
  disabled,
  ariaLabel,
}) => {
  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof clickHandler === 'function') {
      clickHandler(evt);
    }
  };

  return (
    <CustomButton
      aria-label={ariaLabel}
      onClick={disabled ? () => ({}) : handleClick}
      disabled={disabled}
      title={disabled ? 'Please fill out all fields' : undefined}
    >
      {text}
    </CustomButton>
  );
};
