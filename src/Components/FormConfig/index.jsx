import { useContext } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useFormConfig } from './useFormConfig';
import PropTypes from 'prop-types';

/**
 * Renderiza un componente de configuración de formulario.
 *
 * @param {Object} tokenUser - El token de usuario.
 * @param {string} title - El título del formulario.
 * @param {Array} fields - Un array de campos de formulario.
 * @param {Object} api - El objeto de la API.
 * @param {Function} closeToast - Una función para cerrar el mensaje.
 * @return {JSX.Element} El componente de configuración de formulario renderizado.
 */
const FormConfig = ({ tokenUser, title, fields, api, closeToast }) => {
    const context = useContext(MasivosContext);
    const {
        selectedUsers,
        selectedCampaing,
        handleUserSelection,
        handleCampañaSelection,
        handleSubmit
      } = useFormConfig({ tokenUser, title, api, closeToast });
    return (
        <div id="toast-overlay" className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div
                className="relative mx-auto p-4 shadow-lg bg-[#f9f9f9] rounded-lg z-10 flex"
                onClick={(e) => e.stopPropagation()}
            >
                <IoIosCloseCircleOutline
                    className="absolute top-0 right-0 text-4xl text-black m-4 cursor-pointer"
                    onClick={closeToast}
                />
                <div className="shadow-lg p-6 w-80">
                    <h1 className="text-2xl text-[#0096C8]">{title}</h1>
                    <form className="grid grid-cols-1 gap-6 mt-4" onSubmit={handleSubmit} encType="multipart/form-data">
                        {fields.map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                    {field}
                                </label>
                                {field === 'image' ? (
                                    <input
                                        type="file"
                                        id={field}
                                        name={field}
                                        className="form-input block w-full text-sm text-gray-700
                 border border-gray-300 rounded-md 
                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : field === 'users' || field === 'Campaña' ? (
                                    <select
                                        id={field}
                                        name={field}
                                        className="form-select block w-full text-sm text-gray-700
             bg-white border border-gray-300 rounded-md shadow-sm
             p-3 transition duration-150 ease-in-out
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        multiple={field === 'users'}
                                        onChange={field === 'users' ? handleUserSelection : handleCampañaSelection}
                                        value={field === 'users' ? selectedUsers : selectedCampaing}
                                    >
                                        {field === 'users'
                                            ? context.getDataUsers.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.attributes.name}
                                                </option>
                                            ))
                                            : context.getDataClients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.attributes.Client}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        className="form-input block w-full text-sm text-gray-700
                 border border-gray-300 rounded-md
                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                )}
                            </div>
                        ))}
                        <button className=" bg-[#0096C8] text-white w-4/6 h-8 rounded transition-colors duration-200 mb-2" type="submit">
                            Enviar
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

FormConfig.propTypes = {
    tokenUser: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    api: PropTypes.func.isRequired,
    closeToast: PropTypes.func.isRequired,
};

export { FormConfig };