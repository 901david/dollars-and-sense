import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useMappedState } from 'react-use-mapped-state';

type ToasterStyleType = 'success' | 'alert' | 'warning';

interface IToasterProps {
  message: string;
  dismissible?: boolean;
  time?: number;
  type: ToasterStyleType;
  triggered: boolean;
  dismissFn?: () => void;
}

interface IToasterWrapperProps {
  type: ToasterStyleType;
  opened: boolean;
}

const colorMappings = new Map<ToasterStyleType, string>([
  ['success', 'green'],
  ['alert', 'yellow'],
  ['warning', 'red'],
]);

const toasterIn = keyframes`
    0%{transform: translateY(-125%)}
    100%{transform: translateY(5%)}
`;

const toasterOut = keyframes`
    0%{transform: translateY(5%)}
    100%{transform: translateY(-125%)}
`;

const ToasterWrapper = styled.div<IToasterWrapperProps>`
  transform: translateY(-125%);
  background: transparent;
  color: black;
  font-family: inherit;
  font-size: 18px;
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: center;
  animation: ${({ opened }) => (opened ? toasterIn : toasterOut)} 2s forwards;

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

export const Toaster: React.FC<IToasterProps> = ({
  message,
  type,
  dismissible,
  time,
  triggered,
  dismissFn,
}) => {
  const [{ opened }, setState] = useMappedState({ opened: false });

  let timer: any;

  const dismiss = () => {
    setState('opened', false);
    if (timer) {
      clearTimeout(timer);
    }

    if (typeof dismissFn === 'function') {
      dismissFn();
    }
  };

  const triggerToaster = () => {
    setState('opened', true);
    if (time !== undefined) {
      timer = setTimeout(() => {
        dismiss();
      }, time);
    }
  };

  React.useEffect(() => {
    if (triggered) {
      triggerToaster();
    }
  }, [triggered]);

  return (
    <ToasterWrapper opened={opened} type={type}>
      <div className='toaster-inner-wrapper'>
        {dismissible ? (
          <span className='dismiss-icon' onClick={dismiss}>
            &times;
          </span>
        ) : null}
        {message}
      </div>
    </ToasterWrapper>
  );
};
