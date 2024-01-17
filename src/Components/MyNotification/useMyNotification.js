import { useContext, useEffect } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Función para usar la notificación.
 *
 * @return {object} Un objeto con la función closeToast.
 */
const useMyNotification = () => {

    const context = useContext(MasivosContext);

    /**
     * Cierra la notificación de toast.
     *
     * @param {ninguno} - Esta función no toma ningún parámetro.
     * @return {ninguno} - Esta función no devuelve ningún valor.
     */
    const closeToast = () => {
        context.setShowNotification(false);
    };

    /**
     * Maneja eventos de clic que ocurren fuera del elemento de toast.
     *
     * @param {Event} e - El objeto de evento de clic.
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