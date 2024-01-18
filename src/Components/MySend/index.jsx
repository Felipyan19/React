import { useContext } from 'react';
import PropTypes from 'prop-types';
import { MasivosContext } from '../../Context';
import { useNotificationDetails } from './useNotificationDetails';
import { ImgTemplate } from '../../Components/ImgTemplate';
import { IoIosCloseCircleOutline } from 'react-icons/io';

/**
 * Renderiza la sección de encabezado con el detailSend proporcionado.
 *
 * @param {Object} detailSend - El objeto detailSend que contiene los datos necesarios.
 * @return {JSX.Element} El elemento JSX que representa la sección de encabezado.
 */
const HeaderSection = ({ detailSend }) => (

  <div className="bg-white rounded-lg shadow-lg p-3 flex justify-between m-1 ">
    <section className="w-22 text-sky-600 text-base font-semibold border rounded-lg m-1 p-2">
      <h2>Procesados</h2>
      <p className="text-black text-opacity-60 text-sm border-b border-sky-600">{detailSend.procesado}</p>
    </section>
    <section className="w-24 text-sky-600 text-base font-semibold border rounded-lg m-1 p-2">
      <h2>Correctos</h2>
      <p className="text-black text-opacity-60 text-sm border-b border-green-600">{detailSend.correctos}</p>
    </section>
    <section className="w-24 text-sky-600 text-base font-semibold border rounded-lg m-1 p-2">
      <h2>Fallidos</h2>
      <p className="text-black text-opacity-60 text-sm border-b border-red-600">{detailSend.incorrectos}</p>
    </section>
  </div>

);

HeaderSection.propTypes = {
  detailSend: PropTypes.shape({
    procesado: PropTypes.number,
    correctos: PropTypes.number,
    incorrectos: PropTypes.number,
  }),
}


/**
 * Renderiza la sección del cuerpo del componente.
 *
 * @param {number} numberFail - El número de fallos.
 * @param {function} sendHistory - La función para enviar el historial.
 * @param {Array} dataError - El array de errores de datos.
 * @return {JSX.Element} El elemento JSX que representa la sección del cuerpo.
 */
const BodySection = ({ numberFail, sendHistory, dataError }) => (

  <div className="bg-white rounded-lg shadow-lg p-3 h-80 flex justify-between">
    <div className="overflow-auto w-80">
      {!numberFail ? (
        [...sendHistory].reverse().map((result, index) => (
          <div key={index} className="p-2 my-1 border-b flex justify-between mx-4">
            <p className={result.attributes?.code_status === 200 ? 'text-green-700 text-opacity-60 text-sm mr-6' : 'text-red-600 text-opacity-60 text-sm mr-6'}>
              Estado : {result.attributes?.code_status || '400'}
            </p>
            <p className="text-black text-opacity-60 text-sm mr-6">numero : {result.attributes?.wa_id || result?.wa_id}</p>
          </div>
        ))
      ) : (
        [...dataError].reverse().map((result, index) => (
          <div key={index} className="p-2 my-1 border-b  justify-between mx-4">
            <p className={result.number === 200 ? 'text-green-700 text-opacity-60 text-sm' : 'text-red-600 text-opacity-60 text-sm'}>
              {result.number}
            </p>
            <span className="select-none text-xs italic">{result.status.error}</span>
          </div>
        ))
      )}
    </div>
  </div>

);

BodySection.propTypes = {
  numberFail: PropTypes.number,
  sendHistory: PropTypes.array,
  dataError: PropTypes.array,
}

/**
 * Renderiza el componente FooterSection.
 *
 * @param {Object} detailSend - El objeto detailSend que contiene los detalles.
 * @param {number} excelLength - La longitud del archivo de Excel.
 * @param {boolean} isRuning - Un booleano que indica si el proceso está en ejecución o no.
 * @return {JSX.Element} El componente FooterSection renderizado.
 */
const FooterSection = ({ detailSend, excelLength, isRuning }) => {

  const { startStop, clickNumberFail } = useNotificationDetails();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-1 flex justify-between items-center">
      {detailSend.procesado === excelLength && detailSend.incorrectos !== '0' ? (
        <button className="bg-sky-600 text-white rounded-lg p-2" onClick={clickNumberFail}>
          Numeros Erroneos
        </button>
      ) : (
        <button className="bg-sky-600 text-white rounded-lg p-2" onClick={startStop}>
          {isRuning ? 'Reanudar' : 'Detener' }
        </button>
      )}
      <div className="items-center">
        <div className="flex items-center text-sky-600">
          {detailSend.procesado !== excelLength && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
            </svg>
          )}
          <p>
            {detailSend.procesado} / {excelLength}
          </p>
        </div>
      </div>
    </div>
  );
};

FooterSection.propTypes = {
  detailSend: PropTypes.shape({
    procesado: PropTypes.number,
    correctos: PropTypes.number,
    incorrectos: PropTypes.number,
  }),
  excelLength: PropTypes.number,
  isRuning: PropTypes.bool,
}
/**
 * Genera el comentario de función para el cuerpo de la función en un bloque de código markdown con la sintaxis de lenguaje correcta.
 *
 * @return {string} El comentario de la función.
 */
const MySend = () => {

  const { 
    showToast,
    detailSend,
    excelLength,
    numberFail,
    sendHistory,
    dataError,
    isRuning,
    } = useContext(MasivosContext);
    
  const { closeToast } = useNotificationDetails();

  return (
    <>
      {showToast && (
        <div id="toast-overlay" className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div
            className="relative mx-auto p-4 shadow-lg bg-[#f9f9f9] rounded-lg z-10 flex"
            onClick={(e) => e.stopPropagation()}
          >
            {detailSend.procesado === excelLength && (
              <IoIosCloseCircleOutline
                className="absolute top-0 right-0 text-4xl text-black m-4 cursor-pointer"
                onClick={closeToast}
              />
            )}
            <div className="flex justify-center ">
              <ImgTemplate configStyle={true} />
            </div>
            <div className="shadow-lg p-3">
              <HeaderSection detailSend={detailSend} />
              <BodySection numberFail={numberFail} sendHistory={sendHistory} dataError={dataError} />
              <FooterSection detailSend={detailSend} excelLength={excelLength} isRuning={isRuning}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MySend.propTypes = {
  detailSend: PropTypes.shape({
    procesado: PropTypes.number,
    correctos: PropTypes.number,
    incorrectos: PropTypes.number,
  }),
  excelLength: PropTypes.number,
  isRuning: PropTypes.bool,
}

export { MySend };
