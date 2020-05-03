import * as React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useMappedState } from 'react-use-mapped-state';

interface IPrivateRoute {
  route: React.ComponentType;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ route: Route }) => {
  const [{ isAuthenticated, loading }, setState] = useMappedState({
    isAuthenticated: false,
    loading: true,
  });

  React.useEffect(() => {
    axios
      .get('/api/auth/authenticated')
      .then(({ data: { isAuthenticated } }) => {
        console.log(isAuthenticated);
        setState(['isAuthenticated', 'loading'], [isAuthenticated, false]);
      })
      .catch(err => console.error(err));
  }, [setState]);
  if (loading) return <div>Loading....</div>;
  if (!isAuthenticated) return <Redirect to='/login' />;
  return <Route />;
};
