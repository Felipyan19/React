import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TbReportSearch } from 'react-icons/tb';
import { MasivosContext } from '../../Context';
import { SiMicrosoftexcel } from "react-icons/si";
import Ejemplo from '../../Ejemplo_xlsx/EjemploMasivos.xlsx';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

const SendExcel = () => {
  const context = useContext(MasivosContext);
  const token = context.tokenUser;
  const client = context.homeDataClient.attributes.Client
  const template = context.plantilla
  const image = context.urlTemplate

  const [dataExcel, setDataExcel] = useState([]);
  
  
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

  const sendExcelData = async () => {
    let counter = 0;
    let incorrectos = 0;
    let correctos = 0;
    context.setStartSend(true);
    context.setShowToast(true);
    context.setSubmitButtonClicked(false);

  
    for (const item of dataExcel) {
      
       counter++;
      // if (counter > 10) {
      //   break;
      // }
  

      let response = '';

      try {
        if (context.urlImage) {
          response = await context.handleSendTemplate(token, client, item[1], template, image);
        } else {
          response = await context.handleSendMensaje(token, client, item[1], template);
        }
  
        if (response.attributes.code_status === 200) {
          correctos++;
        } else {
          incorrectos++;
          await context.setDataError(prevData => [...prevData, { id: item[0], number: item[1], status: response }]);
        }
      } catch (error) {
        incorrectos++;
        await context.setDataError(prevData => [...prevData, { id: item[0], number: item[1], status: response }]);
      }
  
      await context.setDetailSend({
        procesado: counter,
        correctos: correctos,
        incorrectos: incorrectos
      });

      response.wa_id = item[1];

      await context.setSendHistory(prevData => [...prevData, response]);
    }
  
    console.log(await context.dataError);
    
  };

  useEffect(() => {
    console.log('DataError has updated:', context.dataError);
  }, [context.dataError]);


  const handleclickSendExcel = () => {
    if (context.excelLength > 0 && context.plantilla) {
      sendExcelData();
    } else {
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

