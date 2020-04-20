import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useMappedState } from 'react-use-mapped-state';

interface IPrivateRoute {
  route: React.ComponentType;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ route: Route }) => {
  const [{ isAuthenticated }, setState] = useMappedState({
    isAuthenticated: false,
  });

  React.useEffect(() => {
    axios
      .get('/api/auth/authenticated')
      .then(({ data: isAuthenticated }) => {
        setState('isAuthenticated', isAuthenticated);
      })
      .catch(err => console.error(err));
  }, [setState, isAuthenticated]);

  if (!isAuthenticated) return <Redirect to='/login' />;
  return <Route />;
};
