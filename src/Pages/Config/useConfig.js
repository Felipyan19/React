import { useContext, useEffect, useState } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { theUsers } from '../../Api/theUsers';

/**
 * Genera un hook personalizado que gestiona el estado de configuración para un título específico.
 *
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.title - El título de la configuración.
 * @return {Object} - Un objeto que contiene el estado y funciones para gestionar la configuración.
 */
const useConfig = ({ title }) => {

    const context = useContext(MasivosContext);
    const [showForm, setShowForm] = useState(false);
  
     /**
     * Maneja la operación de creación.
     *
     * @return {void} No hay valor de retorno.
     */
    const handleCreate = () => {
      setShowForm(true);
    };
  
     /**
     * Cierra el aviso.
     *
     * @return {void} 
     */
    const closeToast = () => {
      setShowForm(false);
    }
  
    /**
     * Devuelve la etiqueta para el botón según el valor de la variable 'title'.
     *
     * @return {string} La etiqueta para el botón.
     */
    const nameButton = () => {
      return title === 'Usuarios' || title === 'Campañas' ? 'Crear' : 'Modificar';
    };
  
    useEffect(() => {
  
      theUsers(context.tokenUser)
      .then(result => {
          context.setGetDataUsers(result.data);
      });
  
    }, []);
  
    return { showForm, handleCreate, closeToast, nameButton };
  }

  export { useConfig }