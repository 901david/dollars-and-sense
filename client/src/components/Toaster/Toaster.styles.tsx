import styled, { keyframes, css } from 'styled-components';
import { ToasterStyleType, ToasterWrapperProps } from './Toaster.types';

const colorMappings = new Map<ToasterStyleType, string>([
  ['success', 'green'],
  ['alert', 'red'],
  ['warning', 'yellow'],
]);

export const ToasterWrapper = styled.div<ToasterWrapperProps>`
  background: transparent;
  color: ${({ theme }) => theme.colorBlack};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizeLarge};
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1010;
  transition: all 2s;
  transform: ${({ opened }) =>
    opened ? 'translateY(5%)' : 'translateY(-125%)'};

  .toaster-inner-wrapper {
    width: 65vh;
    background: ${({ type }) => colorMappings.get(type)};
    min-height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 5px;
  }

  .dismiss-icon {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 5px;
  }
`;
