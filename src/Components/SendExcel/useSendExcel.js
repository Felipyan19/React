import { useState, useContext, useEffect, useRef } from 'react';
import { MasivosContext } from '../../Context';
import { variablesTemp } from '../../Api/variablesTemp';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';


/**
 * Generates a function comment for the given function body in a markdown code block with the correct language syntax.
 *
 * @return {object} An object containing the following functions:
 *    - handleFileChange: A function that handles the file change event.
 *    - handleclickSendExcel: A function that handles the click event to send the Excel data.
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
    dataError,
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
   * Tracks the `tokenUser` state and updates `currentTokenUser`.
   *
   * @return {void}
   */
  useEffect(() => {
    currentTokenUser.current = tokenUser;
  }, [tokenUser]);

    /**
   * Monitors the `isRefresh` state and controls the sending process
   * based on `isRefresh` and comparison between `procesado` and
   * `excelLength`.
   *
   * @return {void}
   */
  useEffect(() => {
    currentIsRefresh.current = isRefresh;
    if (!currentIsRefresh.current && !(detailSend.procesado === excelLength)) {
      handleBucleSend();
    }
  }, [isRefresh]);

    /**
   * Observes the `isRuning` state and triggers `handleBucleSend` when
   * `isRuning` is false.
   *
   * @return {void}
   */
  useEffect(() => {
    currentIsRuning.current = isRuning;
    if (!currentIsRuning.current) {
      handleBucleSend();
    }
  }, [isRuning]);

  /**
   * Handles the file change event.
   *
   * @param {object} e - The event object.
   * @return {void} No return value.
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
     * Handles the error when the file could not be read.
     *
     * @param {Event} event - The event object.
     * @return {void} No return value.
     */
    reader.onerror = () => {
      console.error("File could not be read!");
    };
    reader.readAsBinaryString(file);
  };

  /**
   * Handles sending data based on certain conditions.
   *
   * @param {Object} item - the item to be sent
   * @return {Promise<any>} a promise that resolves with the result of the sending operation
   */
  const handeSend = async (item) => {
    if (variables > 0) {
      console.log('variables');
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
   * Handles the sending of data in a loop.
   *
   * @return {Promise<void>} A promise that resolves when the sending of data is completed.
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
   * Sends Excel data.
   *
   * @return {Promise<void>} - A promise that resolves when the data has been sent successfully.
   */
  const sendExcelData = async () => {

    setStartSend(true);
    setShowToast(true);
    setSubmitButtonClicked(false);
    handleBucleSend();

  };

  /**
   * Handles the click event for sending Excel data.
   *
   * @return {undefined} - No return value.
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
