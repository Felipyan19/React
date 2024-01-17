import { useContext } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Genera un gancho personalizado que proporciona detalles y funcionalidades de notificación.
 *
 * @return {object} Un objeto que contiene las siguientes funciones:
 *   - closeToast: Una función que cierra la notificación y realiza acciones adicionales.
 *   - startStop: Una función que alterna el estado de ejecución de las notificaciones.
 *   - clickNumberFail: Una función que alterna la visualización del recuento de notificaciones fallidas.
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
     * Cierra la notificación y realiza acciones adicionales.
     *
     * @return {undefined} Esta función no devuelve ningún valor.
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
     * Alterna el valor de `isRuning`.
     *
     * @return {void} No hay valor de retorno.
     */
    const startStop = () => {
      setIsRuning(!isRuning);
    };
  
    /**
     * Alterna el valor de `numberFail` y actualiza el estado.
     *
     * @return {undefined} No hay valor de retorno.
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