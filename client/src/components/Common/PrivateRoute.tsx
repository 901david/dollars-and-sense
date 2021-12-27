import * as React from 'react';
import { Redirect } from 'react-router-dom';

interface IPrivateRoute {
  route: React.ComponentType;
  isAuthenticated: boolean;
}
export const PrivateRoute: React.FC<IPrivateRoute> = ({
  route: Route,
  isAuthenticated,
}) => {
  if (!isAuthenticated) return <Redirect to='/login' />;
  return <Route />;
};
