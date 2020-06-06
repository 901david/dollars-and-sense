import styled, { keyframes, css } from 'styled-components';
import { ToasterStyleType, ToasterWrapperProps } from './Toaster.types';

const colorMappings = new Map<ToasterStyleType, string>([
  ['success', 'green'],
  ['alert', 'red'],
  ['warning', 'yellow'],
]);

const toasterIn = keyframes`
      0%{transform: translateY(-125%)}
      100%{transform: translateY(5%)}
  `;

const toasterOut = keyframes`
      0%{transform: translateY(5%)}
      100%{transform: translateY(-125%)}
  `;

export const ToasterWrapper = styled.div<ToasterWrapperProps>`
  transform: translateY(-125%);
  background: transparent;
  color: black;
  font-family: inherit;
  font-size: 18px;
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1010;
  justify-content: center;
  ${({ opened }) => {
    if (opened === undefined) return '';
    return css`
      animation: ${opened ? toasterIn : toasterOut} 2s forwards;
    `;
  }}

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
