import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
const wait = require('waait');

import App, { GET_USER } from './App';

describe('App Component', () => {
  const mocks = [
    {
      request: {
        query: GET_USER,
        variables: {
          id: 22,
        },
      },
      result: {
        data: {
          user: { user_name: 'Bob' },
        },
      },
    },
  ];
  describe('Basic Rendering tests', () => {
    let component: any;
    beforeEach(() => {
      component = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>
      );
    });

    test('renders Loading before resolution', async () => {
      const { getByText } = component;

      const linkElement = getByText(/Loading.../i);
      expect(linkElement).toBeInTheDocument();
    });

    test('renders Bob when query resolves', async () => {
      const { getByText } = component;

      await wait(0);
      const linkElement = getByText(/Bob/i);
      expect(linkElement).toBeInTheDocument();
    });

    test('renders error when fails', async () => {
      const badMock = [
        {
          request: {
            query: GET_USER,
            variables: {
              id: 22,
            },
          },
          result: {},
          error: true,
        },
      ];
      const { getByText } = render(
        <MockedProvider mocks={badMock} addTypename={false}>
          <App />
        </MockedProvider>
      );

      await wait(0);
      const linkElement = getByText(/Error/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
