import React from 'react';

export interface ButtonProps {
  text: string;
  clickHandler: (
    evt:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  disabled: boolean;
  ariaLabel: string;
}
