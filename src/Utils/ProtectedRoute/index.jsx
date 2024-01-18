import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

/**
 * Genera un componente de ruta protegida que representa condicionalmente sus hijos en función de la propiedad canActivate.
 *
 * @param {boolean} canActivate - Determina si se deben representar o no los hijos.
 * @param {string} redirectPath - Especifica la ruta a la que redirigir si canActivate es falso. Por defecto, '/'
 * @param {ReactNode} children - Los elementos hijos que se representarán.
 * @return {ReactNode} - Los hijos representados o nulo si canActivate es falso.
 */
const ProtectedRoute = ({ canActivate, redirectPath = '/', children }) => {

  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }
  return canActivate ? children : null;
  
};

ProtectedRoute.propTypes = {
  canActivate: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { ProtectedRoute };
