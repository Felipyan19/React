import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import { useResetPassword } from './useResetPassword';
import { IoIosCloseCircleOutline } from "react-icons/io";

/**
 * Renders a component for resetting passwords.
 *
 * @param {Object} paramsJson - An object containing parameters.
 * @return {React.Component} The rendered component.
 */
const MyResetPassword = ({ paramsJson }) => {

    const context = useContext(MasivosContext);

    const {
        email,
        closeToast,
        sendResetPassword,
        handleEmailChange,
        showPasword,
        handleSubmit
    } = useResetPassword({ paramsJson })

    return (
        <>
            {context.showResetPassword && (
                <div
                    id="toast-overlay"
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    <div
                        className="relative w-1/2 max-w-lg p-6 bg-white rounded-lg shadow-xl z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IoIosCloseCircleOutline
                            className="absolute top-0 right-0 text-3xl text-gray-600 hover:text-gray-800 m-4 cursor-pointer"
                            onClick={closeToast}
                        />

                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Recuperar contraseña
                        </h3>

                        {showPasword ? (
                            <form className="bg-gray-50 rounded-lg p-6 mb-2 shadow-inner" onSubmit={handleSubmit}>
                              <input
                                type="text"
                                name="newPassword"
                                className=" mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50 focus:border-sky-500 transition-shadow"
                                placeholder="Nueva contraseña"
                              />
                              <input
                                type="text"
                                name="repeatNewPassword"
                                className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50 focus:border-sky-500 transition-shadow"
                                placeholder="Repita la nueva contraseña"
                              />
                            <button
                              className="w-full bg-sky-600 text-white text-lg py-3 rounded-lg hover:bg-sky-700 transition-colors"
                              type="submit"
                            >
                              Cambiar contraseña
                            </button>
                          </form>
                        ) : (
                            <>
                                <div className="bg-gray-50 rounded-lg p-4 mb-4 shadow-inner">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                        placeholder="Correo electrónico"
                                    />
                                </div>

                                <button
                                    className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors"
                                    onClick={sendResetPassword}
                                >
                                    Enviar correo de recuperación
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export { MyResetPassword };