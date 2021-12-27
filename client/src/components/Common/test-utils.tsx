import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { globalTheme } from './global-theme';

const getAttr = (selector: string) => {
  if (selector[0] === '#') return 'id';
  if (selector[0] === '.') return 'class';
  throw new Error('Must supplpy and Id or class');
};

const Providers = ({ children }: any) => {
  return <ThemeProvider theme={globalTheme}>{children}</ThemeProvider>;
};

export const setUpPortal = (selector: string) => {
  const portalContainer = document.createElement('div');
  portalContainer.setAttribute(getAttr(selector), selector.slice(1));
  document.body.appendChild(portalContainer);
  return portalContainer;
};

export const renderWithProviders = (ui: any, options?: any) => {
  render(ui, { wrapper: Providers, ...options });
};
