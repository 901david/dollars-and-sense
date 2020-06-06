import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalWrapper,
  ModalCard,
  CloseButton,
  Background,
} from './Modal.styles';

const Portal = ({ children }: any) => {
  const modalRoot = document.getElementById('modal');
  if (modalRoot) return createPortal(children, modalRoot);
  return null;
};

export const Modal: React.FC<{
  children: any;
  toggle: () => void;
  open: boolean;
}> = ({ children, toggle, open }) => {
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
