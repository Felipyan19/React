import { useState, useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { TbReportSearch } from 'react-icons/tb';
import { MasivosContext } from '../../Context';
import { SiMicrosoftexcel } from "react-icons/si";
import Ejemplo from '../../Ejemplo_xlsx/EjemploMasivos.xlsx';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const SendExcel = () => {
  const context = useContext(MasivosContext);
  const client = context.homeDataClient.attributes.Client;
  const template = context.plantilla;
  const image = context.urlTemplate;
  const currentTokenUser = useRef(context.tokenUser);
  const currentIsRuning = useRef(context.isRuning);
  const currentIsRefresh = useRef(context.isRefresh);
  const [dataExcel, setDataExcel] = useState([]);
  const iterBucle = useRef(0);
  const incorrectos = useRef(0);
  const correctos = useRef(0);

  useEffect(() => {

    currentTokenUser.current = context.tokenUser;
    
  }, [context.tokenUser]);

  useEffect(() => {
    console.log(context.isRefresh);
    currentIsRefresh.current = context.isRefresh;
    if (!currentIsRefresh.current && !(context.detailSend.procesado === context.excelLength)) {
      handleBucleSend();
    }
  },[context.isRefresh]);
  
  useEffect(() => {

    currentIsRuning.current = context.isRuning;
    console.log(currentIsRuning.current);
  
    if (!currentIsRuning.current) {
      handleBucleSend();
    }
  
  }, [context.isRuning]);

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
      context.setExcelLength(data.length);
    };
    reader.onerror = () => {
      console.error("File could not be read!");
    };
    reader.readAsBinaryString(file);
  };
  
  const handeSend = async (item) => {
    if (context.urlImage) {
      return await context.handleSendTemplate(currentTokenUser.current, client, item[1], template, image);
    } else {
      return await context.handleSendMensaje(currentTokenUser.current, client, item[1], template);
    }
  }
  
  const handleBucleSend = async () => {
    for (let i = iterBucle.current; i < dataExcel.length; i++) {
      
      console.log(i+1);
      
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
          await context.setDataError(prevData => [...prevData, { id: dataExcel[i][0], number: dataExcel[i][1], status: response }]);
        }
      } catch (error) {
        incorrectos.current++;
        await context.setDataError(prevData => [...prevData, { id: dataExcel[i][0], number: dataExcel[i][1], status: response }]);
      }

      await context.setDetailSend({
        procesado: i+1,
        correctos: correctos.current,
        incorrectos: incorrectos.current
      });

      response.wa_id = dataExcel[i][1];
      
      await context.setSendHistory(prevData => [...prevData, response]);
    }
  }
  
  const sendExcelData = async () => {
    
    context.setStartSend(true);
    context.setShowToast(true);
    context.setSubmitButtonClicked(false);


    handleBucleSend();

    console.log(await context.dataError);
  };

  const handleclickSendExcel = () => {
    if (context.excelLength > 0 && context.plantilla) {
      sendExcelData();
    } else {
      console.log(context.excelLength, context.plantilla);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique los datos ingresados y vuelva a intentar!',
      })
    }
  }

  return (
    <>
      <h1 className="text-sky-600 text-base font-semibold mb-1">Masivos WhatsApp</h1>
      <div className="flex items-center justify-between">
        <div className="text-black text-opacity-60 text-sm ">
          Ingrese los números de teléfono para enviar
        </div>
        <NavLink
          to={Ejemplo}
          className='flex justify-end mr-4 text-3xl text-[#0096C8] font-bold'
          target="_blank" download>
          <SiMicrosoftexcel className="text-2xl" />
        </NavLink>
      </div>
      <input
        type="file"
        className="mt-2 block w-5/6 text-sm text-gray-500
                  file:me-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#0096C8] file:text-white
                  hover:file:bg-blue-700"
        onChange={handleFileChange}
      />
      <div className="">
        <div className="flex items-center justify-between mt-1">
          <button
            id="enviarArchivo"
            className="bg-[#0096C8] w-20 text-white text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2"
            type="button"
            onClick={handleclickSendExcel}
          >
            Enviar
          </button>
          <p id="cantidadRegistros" className="font-bold ml-3">
            {context.excelLength > 0 ? `Registros en el archivo: ${context.excelLength}` : ''}
          </p>
          <NavLink
            to="/Reportes"
            className="flex mr-2 justify-end text-3xl text-[#0096C8] font-bold">
            <TbReportSearch />
          </NavLink>
        </div>

      </div>
    </>
  )

}

export { SendExcel }

