import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './index.css';
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import App from './App';

const client = new ApolloClient({ uri: 'http://localhost:5005/graphql' });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
