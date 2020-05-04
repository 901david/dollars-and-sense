import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMappedState } from 'react-use-mapped-state';
import axios from 'axios';

import { MainDash } from './components/MainDash';
import { PrivateRoute } from './components/Common/PrivateRoute';
import { Login } from './components/Login';

export const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      user_name
    }
  }
`;

const App = () => {
  const [{ isAuthenticated }, setState] = useMappedState({
    isAuthenticated: false,
  });

  const setUserAuthed = () => {
    setState('isAuthenticated', true);
    //TODO: how do we expire this weirdness?
    // setTimeout(() => {
    //   setState('isAuthenticated', false);
    // }, 1000 * 60);
  };
  console.log('AUTH STATUS', isAuthenticated);
  return (
    <div>
      <Router>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          route={() => <Route exact path='/' component={MainDash} />}
        />
        <Route
          path='/login'
          component={() => <Login setUserAuthed={setUserAuthed} />}
        />
        <Route path='/dashboard' component={() => <Redirect to='/' />} />
      </Router>
    </div>
  );
};

export default App;
