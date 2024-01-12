import { useContext } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Generates a custom hook that provides notification details and functionality.
 *
 * @return {object} An object containing the following functions:
 *   - closeToast: A function that closes the notification toast and updates related state.
 *   - startStop: A function that toggles the running state of the notifications.
 *   - clickNumberFail: A function that toggles the display of failed notification count.
 */
const useNotificationDetails = () => {

    const {
      setExcelLength,
      setShowToast,
      setNewNotifications,
      setNotificaciones,
      detailSend,
      setDetailSend,
      plantilla,
      setNumberFail,
      numberFail,
      setIsRuning,
      isRuning,
    } = useContext(MasivosContext);
  
    /**
     * Closes the toast and performs additional actions.
     *
     * @return {undefined} This function does not return a value.
     */
    const closeToast = () => {
      
      setExcelLength('0');
      setShowToast(false);
      setNewNotifications(true);
  
      const plantillaNotificaciones = { ...detailSend, plantilla };
      setNotificaciones((prevData) => [...prevData, plantillaNotificaciones]);
      setDetailSend({ procesado: '0', correctos: '0', incorrectos: '0' });
    };
  
    /**
     * Toggles the value of `isRuning`.
     *
     * @return {void} No return value.
     */
    const startStop = () => {
      setIsRuning(!isRuning);
    };
  
    /**
     * Toggles the value of `numberFail` and updates the state.
     *
     * @return {undefined} No return value.
     */
    const clickNumberFail = () => {
      setNumberFail(!numberFail);
    };
  
    return {
      closeToast,
      startStop,
      clickNumberFail,
    };
  };

  export { useNotificationDetails }