import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useMappedState } from 'react-use-mapped-state';

import { MainDash } from './components/MainDash';
import { PrivateRoute } from './components/Common/PrivateRoute';
import { Login } from './components/Login';
import { Modal } from './components/Modal';
import { Signin } from './components/Signin';

const App = () => {
  const [{ isAuthenticated }, setState] = useMappedState({
    isAuthenticated: false,
  });

  const setUserAuthed = (authenticated: boolean) => {
    setState('isAuthenticated', authenticated);
    //TODO: how do we expire this weirdness?
    // setTimeout(() => {
    //   setState('isAuthenticated', false);
    // }, 1000 * 60);
  };

  return (
    <div>
      <Router>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          route={() => (
            <Route
              exact
              path='/'
              component={() => <MainDash setUserAuthed={setUserAuthed} />}
            />
          )}
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
