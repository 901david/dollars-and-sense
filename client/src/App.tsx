import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { MainDash } from './components/MainDash';
import { PrivateRoute } from './components/Common/PrivateRoute';
import { Login } from './components/Login';

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      user_name
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: 22 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);
  return (
    <div>
      <p>{data.user.user_name}</p>
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
