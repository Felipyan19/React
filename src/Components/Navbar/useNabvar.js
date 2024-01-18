import { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import { Modal } from '../../Utils/Modal';


/**
 * Devuelve un objeto que contiene el nombre del usuario, si la página está desplazada y dos funciones para mostrar una notificación toast y restaurar los datos de la sesión.
 *
 * @return {object} Un objeto con las siguientes propiedades:
 *                  - name: El nombre del usuario.
 *                  - isScrolled: Un booleano que indica si la página está desplazada.
 *                  - toast: Una función para mostrar una notificación toast.
 *                  - restore: Una función para restaurar los datos de la sesión.
 */
const useNabvar = () => {

    const context = useContext(MasivosContext);
    
    const name = context.userLogin?.attributes?.name;
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {

      /**
       * Maneja el evento de desplazamiento.
       *
       * @return {void} Esta función no devuelve un valor.
       */
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    /**
     * Una función para mostrar una notificación toast.
     *
     * @return {void} Esta función no devuelve un valor.
     */
    const toast = () => {
      context.setShowNotification(true);
      context.setNewNotifications(false);
    }
  
    /**
     * Restaura el estado del contexto y muestra un modal de información para una sesión cerrada.
     *
     * @return {void} Esta función no devuelve un valor.
     */
    const restore = () => {
      context.setGetDataClient(false);
      context.setSubmitButtonClicked(false);
      context.setGetDataClients([]);
      context.setLogin(false);
      localStorage.clear();
      Modal('info', 'Sesión cerrada');
    };
  
    return {
      name,
      isScrolled,
      toast,
      restore
    }
  }

export { useNabvar };