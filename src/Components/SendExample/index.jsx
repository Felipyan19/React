import { useContext } from 'react';
import { MasivosContext } from '../../Context';

const SendExample = () => {

  const context = useContext(MasivosContext);

  const token = context.tokenUser;
  const client = context.homeDataClient.attributes.Client
  const phone = context.numeroEjemplo
  const template = context.plantilla
  const image = context.urlTemplate
  let correctos = 0;
  let incorrectos = 0;
  let response
  

  const handeSend = async (phone) => {
    if (context.urlImage) {
      return await context.handleSendTemplate(token, client, phone, template, image);
    } else {
      return await context.handleSendMensaje(token, client, phone, template);
    }
  }

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
    

  return (
    <>
      <h2 className="text-sky-600 text-base font-semibold mt-4 mb-2">Envío de ejemplo</h2>
      <p className="text-black text-opacity-60 text-sm">
        Ingrese su número de teléfono para enviar una prueba.
      </p>
      <div className="flex">
        <input
          id="numeroEjemplo"
          placeholder="Numero de telefono"
          onChange={(e) => {
            context.setNumeroEjemplo(e.target.value);
          }}
          type="text"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2"
        />
        <button
          type="button"
          className="ml-2 mr-20 bg-[#0096C8] w-24 text-white text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2 "
          onClick={() => {
            sendExampleData();
            context.setShowToast(true);
            context.setExcelLength('1');
          }}
        >
          Enviar
        </button>
      </div>
    </>
  );
};

export default SendExample;
