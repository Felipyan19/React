import React, { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import Swal from 'sweetalert2';

const SendExample = () => {

  const context = useContext(MasivosContext);

  const [clicktosend, setClicktosend] = useState(false);

  useEffect(() => {
    if (clicktosend) {
      const token = context.tokenUser;
      const client = context.homeDataClient.attributes.Client
      const phone = context.numeroEjemplo
      const template = context.plantilla
      const image = context.urlTemplate
      if(context.urlImage){
        context.handleSendTemplate(token, client, phone, template, image).then((response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Enviado',
              text: 'respuesta' + JSON.stringify(response),
            })
          }
        })
      }else{
        context.handleSendMensaje(token, client, phone, template).then((response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Enviado',
              text: 'respuesta' + JSON.stringify(response),
            })
          }
        })
      }
    }
  }, [clicktosend])

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
            setClicktosend(!clicktosend)
          }}
        >
          Enviar
        </button>

      </div>
    </>
  );
};

export default SendExample;
