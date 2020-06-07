import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toaster } from './Toaster';
import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';

describe('Toaster tests', () => {
  describe('When the type is success', () => {
    describe('With only required props and is triggered', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster message='hello world' type='success' triggered={true} />
        );
      });

      test('should render the toaster', () => {
        const toaster = screen.getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const toasterText = screen.getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should not render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeFalsy();
      });

      test('should have correct type color', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer.children[0]).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', async () => {
        const innerContainer = await screen.findByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(5%)');
      });
    });

    describe('With only required props and is not triggered', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster message='hello world' type='success' triggered={false} />
        );
      });

      test('should render the toaster', () => {
        const toaster = screen.getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const toasterText = screen.getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should not render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeFalsy();
      });

      test('should have correct type color', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer.children[0]).toHaveStyle('background: green');
      });

      test('should render toaster ooutside of  screen', async () => {
        const wrapper = screen.getByRole('dialog');
        expect(wrapper).toHaveStyle('transform: translateY(-125%)');
      });
    });

    describe('With only required props and is triggered and is dismissible', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster
            dismissible={true}
            message='hello world'
            type='success'
            triggered={true}
          />
        );
      });

      test('should render the toaster', () => {
        const toaster = screen.getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const toasterText = screen.getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeInTheDocument();
      });

      test.skip('should dismiss when dismiss icon clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        const innerContainer = await screen.findByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
      });

      test('should have correct color for type', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer.children[0]).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', async () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(5%)');
      });
    });

    describe('With only required props and is triggered and is timed', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster
            dismissible={true}
            time={50}
            message='hello world'
            type='success'
            triggered={true}
          />
        );
      });

      test('should render the toaster', () => {
        const toaster = screen.getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const toasterText = screen.getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeInTheDocument();
      });

      test('should have correct color for type', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(5%)');
      });

      test('should hide  after the  set amount of time', async () => {
        const innerContainer = await screen.findByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
      });
    });
  });

  describe.skip('When the type is alert', () => {});
  describe.skip('When the type is warning', () => {});
});
