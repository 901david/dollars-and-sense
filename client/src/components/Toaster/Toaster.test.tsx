import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Toaster } from './Toaster';

describe('Toaster tests', () => {
  describe('When the type is success', () => {
    describe.skip('With only required props and is triggered', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster message='hello world' type='success' triggered={true} />
        );
      });

      test('should render the toaster', () => {
        const { getByRole } = renderedComponent;
        const toaster = getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const { getByText } = renderedComponent;
        const toasterText = getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should not render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeFalsy();
      });

      test('should have correct type', () => {
        const { getByRole } = renderedComponent;
        const innerContainer = getByRole('dialog');
        expect(innerContainer).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', async () => {
        const { container } = renderedComponent;
        waitForDomChange({ container }).then(({ container }) => {
          expect(container.children[0]).toHaveStyle(
            'transform: translateY(5%)'
          );
        });
      });
    });

    describe.skip('With only required props and is not triggered', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster message='hello world' type='success' triggered={true} />
        );
      });

      test('should render toaster visible to user', async () => {
        const { container } = renderedComponent;
        await waitFor(() => {
          expect(container.children[0]).toHaveStyle(
            'transform: translateY(125%)'
          );
        });
      });
    });

    describe.skip('With only required props and is triggered and is dismissible', () => {
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
        const { getByRole } = renderedComponent;
        const toaster = getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const { getByText } = renderedComponent;
        const toasterText = getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeInTheDocument();
      });

      test('should have correct color for type', () => {
        const { getByRole } = renderedComponent;
        const innerContainer = getByRole('dialog');
        expect(innerContainer).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', async () => {
        const { container } = renderedComponent;
        waitFor(() => {
          expect(container.children[0]).toHaveStyle(
            'transform: translateY(5%)'
          );
        });
      });
    });

    describe.skip('With only required props and is triggered and is timed', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster
            dismissible={true}
            time={3000}
            message='hello world'
            type='success'
            triggered={true}
          />
        );
      });

      test('should render the toaster', () => {
        const { getByRole } = renderedComponent;
        const toaster = getByRole('dialog');
        expect(toaster).toBeInTheDocument();
      });

      test('should render the toaster with correct text', () => {
        const { getByText } = renderedComponent;
        const toasterText = getByText('hello world');
        expect(toasterText).toBeInTheDocument();
      });

      test('should render dismissible x', () => {
        const { container } = renderedComponent;
        const toasterText = container.querySelector('.dismiss-icon');
        expect(toasterText).toBeInTheDocument();
      });

      test('should have correct color for type', () => {
        const { getByRole } = renderedComponent;
        const innerContainer = getByRole('dialog');
        expect(innerContainer).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', async () => {
        const { container } = renderedComponent;
        waitFor(() => {
          const wrapper = container.find('[type="success"]');
          expect(wrapper).toHaveStyle('transform: translateY(5%)');
        });
      });

      test('should hide  after the  set amount of time', async () => {
        const { container } = renderedComponent;
        waitFor(() => {
          const wrapper = container.find('[type="success"]');
          expect(wrapper).toHaveStyle('transform: translateY(125%)');
        });
      });
    });
  });

  describe.skip('When the type is alert', () => {});
  describe.skip('When the type is warning', () => {});
});
