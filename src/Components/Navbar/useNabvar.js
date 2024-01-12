import { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import { Modal } from '../../Utils/Modal';

/**
 * Returns an object containing the user's name, whether the page is scrolled, and two functions for displaying a toast notification and restoring session data.
 *
 * @return {object} An object with the following properties:
 *                  - name: The user's name.
 *                  - isScrolled: A boolean indicating whether the page is scrolled.
 *                  - toast: A function for displaying a toast notification.
 *                  - restore: A function for restoring session data.
 */
const useNabvar = () => {

    const context = useContext(MasivosContext);
    
    const name = context.userLogin?.attributes?.name;
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {

      /**
       * Handles the scroll event.
       *
       * @param {type} paramName - description of parameter
       * @return {type} description of return value
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
     * A function to display a toast notification.
     *
     * @return {void} This function does not return a value.
     */
    const toast = () => {
      context.setShowNotification(true);
      context.setNewNotifications(false);
    }
  
    /**
     * Restores the state of the context and displays an info modal for a closed session.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    const restore = () => {
      context.setGetDataClient(false);
      context.setSubmitButtonClicked(false);
      context.setGetDataClients([]);
      context.setLogin(false);
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