import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { globalTheme } from './components/Common/global-theme';

const client = new ApolloClient({ uri: 'http://localhost:5005/graphql' });

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
