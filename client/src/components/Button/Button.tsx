import React from 'react';
import styled, { css } from 'styled-components';

interface IButtonProps {
  text: string;
  clickHandler: (
    evt:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  disabled: boolean;
  ariaLabel: string;
}

const CustomButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${({ disabled }) => (disabled ? 'darkgray' : 'white')};
  color: black;
  font-size: 24px;
  font-family: inherit;
  letter-spacing: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transform: scale(1);
  transition: all 0.5s;
  ${({ disabled }) => {
    return (
      !disabled &&
      css`
        :hover {
          transform: scale(1.05);
        }

        :click {
          transform: scale(0.95);
        }
      `
    );
  }}
`;

export const Button: React.FC<IButtonProps> = ({
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
