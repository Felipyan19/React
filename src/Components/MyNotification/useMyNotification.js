import { useContext, useEffect } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Function to use the notification.
 *
 * @return {object} An object with the closeToast function
 */
const useMyNotification = () => {

    const context = useContext(MasivosContext);

    /**
     * Closes the toast notification.
     *
     * @param {none} - This function does not take any parameters.
     * @return {none} - This function does not return any value.
     */
    const closeToast = () => {
        context.setShowNotification(false);
    };

    /**
     * Handles click events that occur outside of the toast element.
     *
     * @param {Event} e - The click event object.
     */
    const handleOutsideClick = (e) => {
        if (e.target.id === "toast-overlay") {
            closeToast();
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

   return { closeToast } 
}

export { useMyNotification }