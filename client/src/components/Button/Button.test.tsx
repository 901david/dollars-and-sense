import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button tests', () => {
  describe('When not disabled', () => {
    let renderedComponent: any;
    const mockHandler = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Button
          ariaLabel='Mock'
          text='Hello World'
          disabled={false}
          clickHandler={mockHandler}
        />
      );
    });

    test('should render with correct text', () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      expect(text).toBeInTheDocument();
    });

    test('should render non disabled css', () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      expect(text).toHaveStyle('background: white');
      expect(text).toHaveStyle('cursor: pointer');
    });

    test('should fire the click handler', async () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      await fireEvent.click(text);
      expect(mockHandler.mock.calls.length).toEqual(1);
    });

    test('should fire the click handler when focused and enter key is pressed', async () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      await fireEvent.focus(text);
      await fireEvent.keyPress(text, { key: 'Enter', code: 'Enter' });
      expect(mockHandler.mock.calls.length).toEqual(1);
    });
  });

  describe('When disabled', () => {
    let renderedComponent: any;
    const mockHandler = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Button
          ariaLabel='Mock'
          text='Hello World'
          disabled={true}
          clickHandler={mockHandler}
        />
      );
    });

    test('should render with correct text', () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      expect(text).toBeInTheDocument();
    });

    test('should render disabled css', () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      expect(text).toHaveStyle('background: darkgray');
      expect(text).toHaveStyle('cursor: not-allowed');
    });

    test('should not fire the click handler', async () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      await fireEvent.click(text);
      expect(mockHandler.mock.calls.length).toEqual(0);
    });

    test('should not fire the click handler when focused and enter key is pressed', async () => {
      const { getByText } = renderedComponent;
      const text = getByText(/Hello World/);
      await fireEvent.focus(text);
      await fireEvent.keyPress(text, { key: 'Enter', code: 'Enter' });
      expect(mockHandler.mock.calls.length).toEqual(0);
    });
  });
});
