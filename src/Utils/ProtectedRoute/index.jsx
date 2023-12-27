import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ canActivate, redirectPath = '/', children }) => {
  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return canActivate ? children : null;
};

export { ProtectedRoute };
