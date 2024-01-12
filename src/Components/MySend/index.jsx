import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import { useNotificationDetails } from './useNotificationDetails';
import { ImgTemplate } from '../../Components/ImgTemplate';
import { IoIosCloseCircleOutline } from 'react-icons/io';


/**
 * Render the header section with the given detailSend.
 *
 * @param {Object} detailSend - The detailSend object containing the required data.
 * @return {JSX.Element} The JSX element representing the header section.
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


/**
 * Renders the body section of the component.
 *
 * @param {number} numberFail - The number of failures.
 * @param {function} sendHistory - The function to send history.
 * @param {Array} dataError - The array of data errors.
 * @return {JSX.Element} The JSX element representing the body section.
 */
const BodySection = ({ numberFail, sendHistory, dataError }) => (

  <div className="bg-white rounded-lg shadow-lg p-3 h-80 flex justify-between">
    <div className="overflow-auto w-80">
      {!numberFail ? (
        [...sendHistory].reverse().map((result, index) => (
          <div key={index} className="p-2 my-1 border-b flex justify-between mx-4">
            <p className={result.attributes?.code_status === '200' ? 'text-green text-opacity-60 text-sm mr-6' : 'text-red-600 text-opacity-60 text-sm mr-6'}>
              estado : {result.attributes?.code_status || '400'}
            </p>
            <p className="text-black text-opacity-60 text-sm mr-6">numero : {result.attributes?.wa_id || result?.wa_id}</p>
          </div>
        ))
      ) : (
        [...dataError].reverse().map((result, index) => (
          <div key={index} className="p-2 my-1 border-b  justify-between mx-4">
            <p className={result.number === '200' ? 'text-green text-opacity-60 text-sm' : 'text-red-600 text-opacity-60 text-sm'}>
              {result.number}
            </p>
            <span className="select-none text-xs italic">{result.status.error}</span>
          </div>
        ))
      )}
    </div>
  </div>

);


/**
 * Renders the FooterSection component.
 *
 * @param {Object} detailSend - The detailSend object containing the details.
 * @param {number} excelLength - The length of the excel file.
 * @param {boolean} isRuning - A boolean indicating whether the process is running or not.
 * @return {JSX.Element} The rendered FooterSection component.
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


/**
 * Generates the function comment for the given function body in a markdown code block with the correct language syntax.
 *
 * @return {string} The function comment.
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

export { MySend };
