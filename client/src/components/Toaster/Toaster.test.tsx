import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toaster } from './Toaster';

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
      const mockDismiss = jest.fn();

      beforeEach(() => {
        mockDismiss.mockReset();
        renderedComponent = render(
          <Toaster
            dismissible={true}
            message='hello world'
            type='success'
            triggered={true}
            dismissFn={mockDismiss}
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

      test('should call dismiss fn when dismiss clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        expect(mockDismiss).toBeCalledTimes(1);
      });

      test.skip('should dismiss when dismiss icon clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        await waitFor(
          () => {
            const innerContainer = screen.getByRole('dialog');
            expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
          },
          { timeout: 5000 }
        );
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
            time={5000}
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

      test.skip('should have correct color for type', async () => {
        const innerContainer = await screen.findByRole('dialog');
        expect(innerContainer).toHaveStyle('background: green');
      });

      test('should render toaster visible to user', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(5%)');
      });
      //TODO: fails when run with all successful with onoly?
      test.skip('should hide  after the  set amount of time', async () => {
        const innerContainer = await screen.findByRole('dialog');
        await waitFor(
          () => {
            expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
          },
          { timeout: 6000 }
        );
      });
    });
  });

  describe('When the type is alert', () => {
    describe('With only required props and is triggered', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster message='hello world' type='alert' triggered={true} />
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
        expect(innerContainer.children[0]).toHaveStyle('background: red');
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
          <Toaster message='hello world' type='alert' triggered={false} />
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
        expect(innerContainer.children[0]).toHaveStyle('background: red');
      });

      test('should render toaster ooutside of  screen', async () => {
        const wrapper = screen.getByRole('dialog');
        expect(wrapper).toHaveStyle('transform: translateY(-125%)');
      });
    });

    describe('With only required props and is triggered and is dismissible', () => {
      let renderedComponent: any;
      const mockDismiss = jest.fn();

      beforeEach(() => {
        mockDismiss.mockReset();
        renderedComponent = render(
          <Toaster
            dismissible={true}
            message='hello world'
            type='alert'
            triggered={true}
            dismissFn={mockDismiss}
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

      test('should call dismiss fn when dismiss clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        expect(mockDismiss).toBeCalledTimes(1);
      });

      test.skip('should dismiss when dismiss icon clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        await waitFor(
          () => {
            const innerContainer = screen.getByRole('dialog');
            expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
          },
          { timeout: 5000 }
        );
      });

      test('should have correct color for type', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer.children[0]).toHaveStyle('background: red');
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
            time={5000}
            message='hello world'
            type='alert'
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

      test.skip('should have correct color for type', async () => {
        const innerContainer = await screen.findByRole('dialog');
        expect(innerContainer).toHaveStyle('background: red');
      });

      test('should render toaster visible to user', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(5%)');
      });
      //TODO: fails when run with all successful with onoly?
      test.skip('should hide  after the  set amount of time', async () => {
        const innerContainer = await screen.findByRole('dialog');
        await waitFor(
          () => {
            expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
          },
          { timeout: 6000 }
        );
      });
    });
  });
  describe('When the type is warning', () => {
    describe('With only required props and is triggered', () => {
      let renderedComponent: any;

      beforeEach(() => {
        renderedComponent = render(
          <Toaster message='hello world' type='warning' triggered={true} />
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
        expect(innerContainer.children[0]).toHaveStyle('background: yellow');
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
          <Toaster message='hello world' type='warning' triggered={false} />
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
        expect(innerContainer.children[0]).toHaveStyle('background: yellow');
      });

      test('should render toaster ooutside of  screen', async () => {
        const wrapper = screen.getByRole('dialog');
        expect(wrapper).toHaveStyle('transform: translateY(-125%)');
      });
    });

    describe('With only required props and is triggered and is dismissible', () => {
      let renderedComponent: any;
      const mockDismiss = jest.fn();

      beforeEach(() => {
        mockDismiss.mockReset();
        renderedComponent = render(
          <Toaster
            dismissible={true}
            message='hello world'
            type='warning'
            triggered={true}
            dismissFn={mockDismiss}
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

      test('should call dismiss fn when dismiss clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        expect(mockDismiss).toBeCalledTimes(1);
      });

      test.skip('should dismiss when dismiss icon clicked', async () => {
        const { container } = renderedComponent;
        const dismissIcon = container.querySelector('.dismiss-icon');
        await fireEvent.click(dismissIcon);
        await waitFor(
          () => {
            const innerContainer = screen.getByRole('dialog');
            expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
          },
          { timeout: 5000 }
        );
      });

      test('should have correct color for type', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer.children[0]).toHaveStyle('background: yellow');
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
            time={5000}
            message='hello world'
            type='warning'
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

      test.skip('should have correct color for type', async () => {
        const innerContainer = await screen.findByRole('dialog');
        expect(innerContainer).toHaveStyle('background: yellow');
      });

      test('should render toaster visible to user', () => {
        const innerContainer = screen.getByRole('dialog');
        expect(innerContainer).toHaveStyle('transform: translateY(5%)');
      });
      //TODO: fails when run with all successful with onoly?
      test.skip('should hide  after the  set amount of time', async () => {
        const innerContainer = await screen.findByRole('dialog');
        await waitFor(
          () => {
            expect(innerContainer).toHaveStyle('transform: translateY(-125%)');
          },
          { timeout: 6000 }
        );
      });
    });
  });
});
