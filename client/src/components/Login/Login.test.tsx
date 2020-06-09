import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';

describe('Login tests', () => {
  describe('When the type is success', () => {
    let renderedComponent: any;
    const mockSetAuth = jest.fn();

    beforeEach(() => {
      mockSetAuth.mockReset();
      renderedComponent = render(<Login setUserAuthed={mockSetAuth} />);
    });

    test('should ', () => {});
  });
});
