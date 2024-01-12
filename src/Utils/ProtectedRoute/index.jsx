import { Navigate } from 'react-router-dom';

/**
 * Generates a protected route component that conditionally renders its children based on the canActivate prop.
 *
 * @param {boolean} canActivate - Determines whether the children should be rendered or not.
 * @param {string} redirectPath - Specifies the path to redirect to if canActivate is false. Defaults to '/'.
 * @param {ReactNode} children - The children elements to be rendered.
 * @return {ReactNode} - The rendered children or null if canActivate is false.
 */
const ProtectedRoute = ({ canActivate, redirectPath = '/', children }) => {

  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return canActivate ? children : null;
  
};

export { ProtectedRoute };
