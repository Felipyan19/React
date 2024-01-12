import { useContext, useEffect, useState } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { theUsers } from '../../Api/theUsers';

/**
 * Generates a custom hook that manages the configuration state for a specific title.
 *
 * @param {Object} config - The configuration object.
 * @param {string} config.title - The title of the configuration.
 * @return {Object} - An object containing the state and functions for managing the configuration.
 */
const useConfig = ({ title }) => {

    const context = useContext(MasivosContext);
    const [showForm, setShowForm] = useState(false);
  
    /**
     * Handle the create operation.
     *
     * @return {void} There is no return value.
     */
    const handleCreate = () => {
      setShowForm(true);
    };
  
    /**
     * Closes the toast.
     *
     * @return {void} 
     */
    const closeToast = () => {
      setShowForm(false);
    }
  
    /**
     * Returns the label for the button based on the value of the 'title' variable.
     *
     * @return {string} The label for the button.
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