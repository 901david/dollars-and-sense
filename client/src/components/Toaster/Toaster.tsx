import React from 'react';
import { useMappedState } from 'react-use-mapped-state';
import { ToasterProps } from './Toaster.types';
import { ToasterWrapper } from './Toaster.styles';

export const Toaster: React.FC<ToasterProps> = ({
  message,
  type,
  dismissible,
  time,
  triggered,
  dismissFn,
}) => {
  const [{ opened }, setState] = useMappedState({ opened: undefined });

  let timer: any;

  const dismiss = () => {
    setState('opened', false);
    if (timer) {
      clearTimeout(timer);
    }

    if (typeof dismissFn === 'function') {
      setTimeout(() => {
        dismissFn();
      }, 1000 * 2);
    }
  };

  const triggerToaster = React.useCallback(() => {
    setState('opened', true);
    if (time !== undefined) {
      timer = setTimeout(() => {
        dismiss();
      }, time);
    }
  }, [setState, dismiss]);

  React.useEffect(() => {
    if (triggered) {
      triggerToaster();
    }
  }, [triggered, triggerToaster]);

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
