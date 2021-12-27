import { createPortal } from 'react-dom';

export const Portal = ({ children }: any) => {
  const modalRoot = document.getElementById('modal');
  if (modalRoot) return createPortal(children, modalRoot);
  return null;
};
