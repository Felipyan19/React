import { useState, useContext, useEffect, useRef } from 'react';
import { MasivosContext } from '../../Context';
import { variablesTemp } from '../../Api/variablesTemp';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

/**
 * Genera comentarios de funciones para el cuerpo de la función dada en un bloque de código de markdown con la sintaxis del lenguaje correcto.
 *
 * @return {object} Un objeto que contiene las siguientes funciones:
 *    - handleFileChange: Una función que maneja el evento de cambio de archivo.
 *    - handleclickSendExcel: Una función que maneja el evento de clic para enviar los datos de Excel.
 */
const useSendExcel = () => {

  const {

    tokenUser,
    isRuning,
    isRefresh,
    detailSend,
    excelLength,
    homeDataClient,
    handleSendTemplate,
    handleSendMensaje,
    setDataError,
    setDetailSend,
    setSendHistory,
    setStartSend,
    setShowToast,
    setSubmitButtonClicked,
    urlImage,
    plantilla,
    urlTemplate,
    idPlantilla,
    setExcelLength,
    handleSendEmail,
    variables,
    setVariablesInputs

  } = useContext(MasivosContext);

  const currentTokenUser = useRef(tokenUser);
  const currentIsRuning = useRef(isRuning);
  const currentIsRefresh = useRef(isRefresh);
  const [dataExcel, setDataExcel] = useState([]);
  const iterBucle = useRef(0);
  const incorrectos = useRef(0);
  const correctos = useRef(0);

  /**
   * Rastrea el estado de `tokenUser` y actualiza `currentTokenUser`.
   *
   * @return {void}
   */
  useEffect(() => {
    currentTokenUser.current = tokenUser;
  }, [tokenUser]);

  /**
   * Monitorea el estado de `isRefresh` y controla el proceso de envío
   * basado en `isRefresh` y la comparación entre `procesado` y
   * `excelLength`.
   *
   * @return {void}
   */
  useEffect(() => {
    currentIsRefresh.current = isRefresh;
    if (currentIsRefresh.current && !(detailSend.procesado === excelLength)) {
      handleBucleSend();
    }
  }, [isRefresh]);

  /**
   * Observa el estado de `isRuning` y desencadena `handleBucleSend` cuando
   * `isRuning` es true.
   *
   * @return {void}
   */
  useEffect(() => {
    currentIsRuning.current = isRuning;
    if (currentIsRuning.current) {
      handleBucleSend();
    }
  }, [isRuning]);

  /**
   * Maneja el evento de cambio de archivo.
   *
   * @param {object} e - El objeto de evento.
   * @return {void} No hay valor de retorno.
   */
  const handleFileChange = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setDataExcel(data);
      setExcelLength(data.length);
      if (variables > 0) {
        let obj = {};
        for (let index = 1; index <= variables; index++) { 
          obj[`${index}`] = data[0][index + 1];
        }
        setVariablesInputs(obj);
      }
    };
    
    /**
     * Maneja el error cuando no se pudo leer el archivo.
     *
     * @param {Event} event - El objeto de evento.
     * @return {void} No hay valor de retorno.
     */
    reader.onerror = () => {
      console.error("File could not be read!");
    };
    reader.readAsBinaryString(file);
  };

  /**
   * Maneja el envío de datos basado en ciertas condiciones.
   *
   * @param {Object} item - el elemento a enviar
   * @return {Promise<any>} una promesa que se resuelve con el resultado de la operación de envío
   */
  const handeSend = async (item) => {
    if (variables > 0) {
      let mivar = []
      for (let index = 1; index <= variables; index++) { 
        mivar[index-1] = item[index+1]+'';
      }

      return await variablesTemp(
        currentTokenUser.current, 
        homeDataClient.attributes.Client, 
        item[1], 
        plantilla, 
        mivar,
        urlTemplate
        );
    }
    if (urlImage) {
      return await handleSendTemplate(
        currentTokenUser.current, 
        homeDataClient.attributes.Client, 
        item[1], 
        plantilla, 
        urlTemplate
        );
    }
    if(!urlImage){
      return await handleSendMensaje(
        currentTokenUser.current, 
        homeDataClient.attributes.Client, 
        item[1], 
        plantilla
        );

    }
  };

  /**
   * Maneja el envío de datos en un bucle.
   *
   * @return {Promise<void>} Una promesa que se resuelve cuando se completa el envío de datos.
   */
  const handleBucleSend = async () => {

    for (let i = iterBucle.current; i < dataExcel.length; i++) {

      if (currentIsRuning.current) {
        iterBucle.current = i;
        return;
      }

      if (currentIsRefresh.current) {
        iterBucle.current = i;
        return;
      }

      let response;
      try {
        response = await handeSend(dataExcel[i]);

        if (response.attributes.code_status === 200) {

          correctos.current++;

        } else {

          incorrectos.current++;
          await setDataError(prevData => [...prevData, 
            { id: dataExcel[i][0], number: dataExcel[i][1], status: response }]);

        }
      } catch (error) {

        incorrectos.current++;
        await setDataError(prevData => [...prevData, 
            { id: dataExcel[i][0], number: dataExcel[i][1], status: response }]);

      }

      await setDetailSend({

        procesado: i+1,
        correctos: `${correctos.current}`,
        incorrectos: `${incorrectos.current}`,

      });

      response.wa_id = dataExcel[i][1];

      await setSendHistory(prevData => [...prevData, response]);
      
    }

    await handleSendEmail(tokenUser, excelLength, incorrectos.current, correctos.current, idPlantilla);

  };

  /**
   * Envía datos de Excel.
   *
   * @return {Promise<void>} - Una promesa que se resuelve cuando los datos se han enviado con éxito.
   */
  const sendExcelData = async () => {

    setStartSend(true);
    setShowToast(true);
    setSubmitButtonClicked(false);
    handleBucleSend();

  };

  /**
   * Maneja el evento de clic para enviar datos de Excel.
   *
   * @return {undefined} - No hay valor de retorno.
   */
  const handleclickSendExcel = () => {

    if (excelLength > 0 && plantilla) {
      sendExcelData();

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique los datos ingresados y vuelva a intentar!',
      });

    }
  };

  return {
    handleFileChange,
    handleclickSendExcel,
  };
};

export { useSendExcel };
