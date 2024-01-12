import {  useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TbReportSearch } from 'react-icons/tb';
import { MasivosContext } from '../../Context';
import { SiMicrosoftexcel } from "react-icons/si";
import { useSendExcel } from './useSendExcel';
import Ejemplo from '../../Ejemplo_xlsx/EjemploMasivos.xlsx';


const SendExcel = () => {
  const { handleFileChange, handleclickSendExcel } = useSendExcel();
  const { excelLength } = useContext(MasivosContext);

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
            {excelLength > 0 ? `Registros en el archivo: ${excelLength}` : ''}
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

export { SendExcel };
