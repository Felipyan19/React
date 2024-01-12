import { useContext } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Generates a function comment for the given function body.
 *
 * @return {Object} An object containing two functions: `handleNumeroEjemplo` and `handleSendExample`.
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
     * Handles the send operation.
     *
     * @param {string} phone - The phone number to send the message to.
     * @return {Promise<any>} A promise that resolves to the result of the send operation.
     */
    const handeSend = async (phone) => {
      if (context.urlImage) {
        return await context.handleSendTemplate(token, client, phone, template, image);
      } else {
        return await context.handleSendMensaje(token, client, phone, template);
      }
    }
  
    /**
     * Sends example data asynchronously.
     *
     * @return {Promise<void>} - A promise that resolves when the data is sent.
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
     * A description of the entire function.
     *
     * @param {type} e - the event object
     * @return {type} undefined
     */
    const handleNumeroEjemplo = (e) => {
      context.setNumeroEjemplo(e.target.value)
    }
  
    /**
     * Executes the handleSendExample function.
     *
     * @return {void} This function does not return a value.
     */
    const handleSendExample = () => {
      sendExampleData();
      context.setShowToast(true);
      context.setExcelLength('1');
    }
  
    return { handleNumeroEjemplo, handleSendExample };
  
  }

  export { useSendExample }