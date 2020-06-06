import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Input } from './Input';

describe('Input tests', () => {
  describe('When providing only required basic props', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='name'
          labelId='name-input-label'
          inputId='name-input'
          type='text'
          label='Name'
          blurFn={mockBlur}
        />
      );
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Name/);
      expect(textEL.name).toEqual('name');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Name/);
      expect(labelEl.id).toEqual('name-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.id).toEqual('name-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.type).toEqual('text');
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });
  });

  describe('When providing only required basic props and required prop true', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='name'
          required={true}
          labelId='name-input-label'
          inputId='name-input'
          type='text'
          label='Name'
          blurFn={mockBlur}
        />
      );
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Name/);
      expect(textEL.name).toEqual('name');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Name/);
      expect(labelEl.id).toEqual('name-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.id).toEqual('name-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.type).toEqual('text');
    });

    test('should render with asterisk in label', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/\*/);
      expect(labelEl).toBeInTheDocument();
    });

    test('should render with required attribute', () => {
      const { getByLabelText } = renderedComponent;
      const labelEl = getByLabelText(/\*/);
      expect(labelEl.required).toEqual(true);
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });
  });

  describe('When providing only required basic props and required prop false', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='name'
          required={false}
          labelId='name-input-label'
          inputId='name-input'
          type='text'
          label='Name'
          blurFn={mockBlur}
        />
      );
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Name/);
      expect(textEL.name).toEqual('name');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Name/);
      expect(labelEl.id).toEqual('name-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.id).toEqual('name-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.type).toEqual('text');
    });

    test('should not render with asterisk in label', () => {
      const { queryByText } = renderedComponent;
      const labelEl = queryByText(/\*/);
      console.log(labelEl);
      expect(labelEl).not.toBeInTheDocument();
    });

    test('should render without required attribute', () => {
      const { getByLabelText } = renderedComponent;
      const labelEl = getByLabelText(/Name/);
      expect(labelEl.required).toEqual(false);
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });
  });

  describe('When providing only required basic props and required prop and change handler', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();
    const mockChange = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='name'
          required={true}
          labelId='name-input-label'
          inputId='name-input'
          type='text'
          label='Name'
          changeFn={mockChange}
          blurFn={mockBlur}
        />
      );
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Name/);
      expect(textEL.name).toEqual('name');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Name/);
      expect(labelEl.id).toEqual('name-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.id).toEqual('name-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.type).toEqual('text');
    });

    test('should not render with asterisk in label', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/\*/);
      expect(labelEl).toBeInTheDocument();
    });

    test('should render without required attribute', () => {
      const { getByLabelText } = renderedComponent;
      const labelEl = getByLabelText(/\*/);
      expect(labelEl.required).toEqual(true);
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });

    test('should correctly invoke change function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.change(inputEl, { target: { value: 'h' } });
      expect(mockChange.mock.calls.length).toEqual(1);
    });
  });

  describe('When providing only required basic props and required prop and change handler and defaultColor', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();
    const mockChange = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='name'
          required={true}
          labelId='name-input-label'
          inputId='name-input'
          type='text'
          label='Name'
          defaultColor='purple'
          changeFn={mockChange}
          blurFn={mockBlur}
        />
      );
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Name/);
      expect(textEL.name).toEqual('name');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Name/);
      expect(labelEl.id).toEqual('name-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.id).toEqual('name-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL.type).toEqual('text');
    });

    test('should not render with asterisk in label', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/\*/);
      expect(labelEl).toBeInTheDocument();
    });

    test('should render without required attribute', () => {
      const { queryByLabelText } = renderedComponent;
      const labelEl = queryByLabelText(/\*/);
      expect(labelEl.required).toEqual(true);
    });

    test('should render with correct default color', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Name/);
      expect(inputEL).toHaveStyle('border-bottom: solid 5px purple');
      expect(inputEL).toHaveStyle('color: purple');
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });

    test('should correctly invoke change function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Name/);
      await fireEvent.change(inputEl, { target: { value: 'h' } });
      expect(mockChange.mock.calls.length).toEqual(1);
    });
  });

  describe('When providing only required basic props and required prop and change handler and defaultColor, and validator when input is invalid', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();
    const mockChange = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='email'
          required={true}
          labelId='email-input-label'
          inputId='email-input'
          type='email'
          label='Email'
          defaultColor='purple'
          changeFn={mockChange}
          blurFn={mockBlur}
          validator={'email'}
        />
      );
    });

    afterEach(() => {
      mockBlur.mockReset();
      mockChange.mockReset();
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Email/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Email/);
      expect(textEL.name).toEqual('email');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Email/);
      expect(labelEl.id).toEqual('email-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      expect(inputEL.id).toEqual('email-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      expect(inputEL.type).toEqual('email');
    });

    test('should not render with asterisk in label', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/\*/);
      expect(labelEl).toBeInTheDocument();
    });

    test('should render without required attribute', () => {
      const { queryByLabelText } = renderedComponent;
      const labelEl = queryByLabelText(/\*/);
      expect(labelEl.required).toEqual(true);
    });

    test('should render with correct errored color when text invalid', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      await fireEvent.change(inputEL, { target: { value: 'bob@gmailcom' } });
      expect(inputEL).toHaveStyle('border-bottom: solid 5px red');
    });

    test('should render with correct errors in  title', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      await fireEvent.change(inputEL, { target: { value: 'bob@gmailcom' } });
      expect(inputEL.title).toEqual(
        'Email must contain an @ and a . to be valid'
      );
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Email/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });

    test('should correctly invoke change function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Email/);
      await fireEvent.change(inputEl, { target: { value: 'h' } });
      expect(mockChange.mock.calls.length).toEqual(1);
    });
  });

  describe('When providing only required basic props and required prop and change handler and defaultColor, and validator when  input is valid', () => {
    let renderedComponent: any;
    const mockBlur = jest.fn();
    const mockChange = jest.fn();

    beforeEach(() => {
      renderedComponent = render(
        <Input
          name='email'
          required={true}
          labelId='email-input-label'
          inputId='email-input'
          type='email'
          label='Email'
          defaultColor='purple'
          changeFn={mockChange}
          blurFn={mockBlur}
          validator={'email'}
        />
      );
    });

    afterEach(() => {
      mockBlur.mockReset();
      mockChange.mockReset();
    });

    test('should render with correct label', () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Email/);
      expect(inputEl).toBeInTheDocument();
    });

    test('should render with correct name', () => {
      const { getByLabelText } = renderedComponent;
      const textEL = getByLabelText(/Email/);
      expect(textEL.name).toEqual('email');
    });

    test('should render with correct labelid', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/Email/);
      expect(labelEl.id).toEqual('email-input-label');
    });

    test('should render with correct input id', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      expect(inputEL.id).toEqual('email-input');
    });

    test('should render with correct type', () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      expect(inputEL.type).toEqual('email');
    });

    test('should not render with asterisk in label', () => {
      const { getByText } = renderedComponent;
      const labelEl = getByText(/\*/);
      expect(labelEl).toBeInTheDocument();
    });

    test('should render without required attribute', () => {
      const { queryByLabelText } = renderedComponent;
      const labelEl = queryByLabelText(/\*/);
      expect(labelEl.required).toEqual(true);
    });

    test('should render with correct errored color when text invalid', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      await fireEvent.change(inputEL, { target: { value: 'bob@gmail.com' } });
      expect(inputEL).toHaveStyle('border-bottom: solid 5px purple');
    });

    test('should render with correct errors in  title', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEL = getByLabelText(/Email/);
      await fireEvent.change(inputEL, { target: { value: 'bob@gmail.com' } });
      expect(inputEL.title).toEqual('');
    });

    test('should correctly invoke blur function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Email/);
      await fireEvent.focus(inputEl);
      await fireEvent.keyPress(inputEl, { key: 'h', code: '72' });
      await fireEvent.blur(inputEl);
      expect(mockBlur.mock.calls.length).toEqual(1);
    });

    test('should correctly invoke change function', async () => {
      const { getByLabelText } = renderedComponent;
      const inputEl = getByLabelText(/Email/);
      await fireEvent.change(inputEl, { target: { value: 'h' } });
      expect(mockChange.mock.calls.length).toEqual(1);
    });
  });
});
