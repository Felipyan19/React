import { useSendExample } from './useSendExample';

/**
 * Renderiza el componente SendExample.
 *
 * @return {JSX.Element} El componente SendExample.
 */
const SendExample = () => {

  const { handleNumeroEjemplo, handleSendExample } = useSendExample();

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
          onChange={handleNumeroEjemplo}
          type="text"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2"
        />
        <button
          type="button"
          className="ml-2 mr-20 bg-[#0096C8] w-24 text-white text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2 "
          onClick={handleSendExample}
        >
          Enviar
        </button>
      </div>
    </>
  );
};

export default SendExample;
