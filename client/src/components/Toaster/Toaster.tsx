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
  const dismissIcon = React.useRef<HTMLSpanElement | null>(null);
  const [{ opened }, setState] = useMappedState({ opened: triggered });

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

  const handleKeyPress = (evt: React.KeyboardEvent) => {
    if (evt.which === 13) dismiss();
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
      if (dismissIcon !== null && dismissIcon.current) {
        dismissIcon.current.focus();
      }
    }
  }, [triggered, triggerToaster]);

  return (
    <ToasterWrapper role='dialog' opened={opened} type={type}>
      <div className='toaster-inner-wrapper'>
        {dismissible ? (
          <span
            ref={dismissIcon}
            className='dismiss-icon'
            tabIndex={0}
            onClick={dismiss}
            onKeyPress={handleKeyPress}
          >
            &times;
          </span>
        ) : null}
        {message}
      </div>
    </ToasterWrapper>
  );
};
