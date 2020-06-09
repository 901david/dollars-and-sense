import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.fullVW};
  ${({ theme }) => theme.flexProperties('center', 'center')};
`;
export const ModalCard = styled.div`
  position: relative;
  min-width: 320px;
  z-index: 10;
  margin-bottom: 100px;
  background: ${({ theme }) => theme.colorWhite};
  border-radius: ${({ theme }) => theme.standardBorderRadius};
  padding: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
export const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  padding: 5px;

  &:hover {
    cursor: pointer;
  }
`;
export const Background = styled.div`
  position: absolute;
  ${({ theme }) => theme.fullVW};
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colorBlack};
  opacity: 0.5;
`;
