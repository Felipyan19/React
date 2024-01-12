import { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';

const useNotificationDetails = () => {
    const {
      tokenUser,
      handleSendEmail,
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
  
    const closeToast = () => {
      
      setExcelLength('0');
      setShowToast(false);
      setNewNotifications(true);
  
      const plantillaNotificaciones = { ...detailSend, plantilla };
      setNotificaciones((prevData) => [...prevData, plantillaNotificaciones]);
      setDetailSend({ procesado: '0', correctos: '0', incorrectos: '0' });
    };
  
    const startStop = () => {
      setIsRuning(!isRuning);
    };
  
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