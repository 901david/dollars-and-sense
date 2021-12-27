export type ToasterStyleType = 'success' | 'alert' | 'warning';

export interface ToasterProps {
  message: string;
  dismissible?: boolean;
  time?: number;
  type: ToasterStyleType;
  triggered: boolean | undefined;
  dismissFn?: () => void;
}

export interface ToasterWrapperProps {
  type: ToasterStyleType;
  opened: boolean;
}