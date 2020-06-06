import React from 'react';
import {
  ModalWrapper,
  ModalCard,
  CloseButton,
  Background,
} from './Modal.styles';
import { Portal } from '../Portal/Portal';
import { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({ children, toggle, open }) => {
  return (
    <Portal>
      {open && (
        <ModalWrapper>
          <ModalCard>
            <CloseButton onClick={toggle}>&times;</CloseButton>
            {children}
          </ModalCard>
          <Background onClick={toggle} />
        </ModalWrapper>
      )}
    </Portal>
  );
};
