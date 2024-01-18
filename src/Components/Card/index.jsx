import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ImgError from '../../Assets/404-min.webp';

/**
 * Renderiza un componente de tarjeta con datos del cliente.
 *
 * @param {Object} data - El objeto de datos que contiene información del cliente.
 * @return {JSX.Element} El componente de tarjeta renderizado.
 */
const Card = ({ data }) => {
  const context = useContext(MasivosContext);
  const navigate = useNavigate();

  /**
   * Muestra los datos proporcionados.
   *
   * @param {Object} data - Los datos que se mostrarán.
   * @return {void} Esta función no devuelve nada.
   */
  const show = (data) => {
    context.setHomeDataClient(data);
    navigate('/Home');
  };

  /**
   * Maneja el error al cargar una imagen.
   *
   * @param {Event} e - El objeto de evento que contiene información sobre el error.
   * @return {void} Esta función no devuelve nada.
   */
  const handleImageError = (e) => {
    e.target.src = ImgError;
  };

  return (
    <div
      className='flex flex-col bg-white cursor-pointer p-3 shadow-lg hover:shadow-2xl transition-shadow duration-200 rounded-lg transform hover:scale-105'
      onClick={() => show(data)}
      role="button"
      aria-label="Show details"
    >
      <div className='w-52 h-48 relative overflow-hidden rounded-lg'>
        <img
          className='w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-200'
          src={data?.attributes?.image}
          alt='Client'
          onError={handleImageError}
        />
      </div>
      <div className='mt-4'>
        <p className='text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200'>
          {data?.attributes?.Client}
        </p>
        <p className='text-gray-500 mt-2'>
          ID: {data?.id}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      image: PropTypes.string,
      Client: PropTypes.string,
    }),
    id: PropTypes.number,
  }).isRequired,
};

export { Card };
