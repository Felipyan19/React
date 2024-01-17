import { useContext } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Genera un comentario de función para el cuerpo de la función dada.
 *
 * @return {Object} Un objeto que contiene dos funciones: `handleNumeroEjemplo` y `handleSendExample`.
 */
const useSendExample = () => {

    const context = useContext(MasivosContext);
  
    const token = context.tokenUser;
    const client = context.homeDataClient.attributes.Client
    const phone = context.numeroEjemplo
    const template = context.plantilla
    const image = context.urlTemplate
    let correctos = 0;
    let incorrectos = 0;
    let response
  
    /**
     * Maneja la operación de envío.
     *
     * @param {string} phone - El número de teléfono al que se enviará el mensaje.
     * @return {Promise<any>} Una promesa que se resuelve con el resultado de la operación de envío.
     */
    const handeSend = async (phone) => {
      if (context.urlImage) {
        return await context.handleSendTemplate(token, client, phone, template, image);
      } else {
        return await context.handleSendMensaje(token, client, phone, template);
      }
    }
  
    /**
     * Envía datos de ejemplo de forma asíncrona.
     *
     * @return {Promise<void>} - Una promesa que se resuelve cuando se envían los datos.
     */
    const sendExampleData = async () => {
  
      try {
        
        response = await handeSend(phone)
  
        if (response.attributes.code_status === 200) {
          correctos++;
        } else {
          incorrectos++;
          await context.setDataError(prevData => [...prevData, { id: 1, number: phone, status: response }]);
        }
      } catch (error) {
  
        incorrectos++;
        await context.setDataError(prevData => [...prevData, { id: 1, number: phone, status: response }]);
  
      }
  
      await context.setDetailSend({
        procesado: '1',
        correctos: `${correctos}`,
        incorrectos: `${incorrectos}`
      });
  
      response.wa_id = phone;
  
      await context.setSendHistory(prevData => [...prevData, response]);
  
  
      await context.handleSendEmail(
        context.tokenUser,
        '1',
        incorrectos,
        correctos,
        context.idPlantilla
      );
  
    }
  
    /**
     * Una descripción de toda la función.
     *
     * @param {type} e - el objeto de evento
     * @return {type} indefinido
     */
    const handleNumeroEjemplo = (e) => {
      context.setNumeroEjemplo(e.target.value)
    }
  
    /**
     * Ejecuta la función handleSendExample.
     *
     * @return {void} Esta función no devuelve un valor.
     */
    const handleSendExample = () => {
      sendExampleData();
      context.setShowToast(true);
      context.setExcelLength('1');
    }
  
    return { handleNumeroEjemplo, handleSendExample };
  
  }

  export { useSendExample }