import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { MainDash } from './components/MainDash';
import { PrivateRoute } from './components/Common/PrivateRoute';
import { Login } from './components/Login';

const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Router>
        <PrivateRoute
          route={() => <Route exact path='/' component={MainDash} />}
        />
        <Route path='/login' component={Login} />
      </Router>
    </div>
  );
};

export default App;
