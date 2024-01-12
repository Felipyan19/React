import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import { useMyNotification } from './useMyNotification';

/**
 * Renders a notification component based on the showNotification flag from the MasivosContext.
 *
 * @return {ReactNode} The rendered notification component.
 */
const MyNotification = () => {

    const context = useContext(MasivosContext);
    const {closeToast } = useMyNotification()
 
    return (
        <>
            {context.showNotification && (
                <div
                    id="toast-overlay"
                    className="fixed inset-0 flex items-center justify-center z-50 "
                    onClick={closeToast}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div
                        className="fixed top-0 right-0 mt-4 mr-4 p-4 shadow-lg bg-[#f9f9f9] rounded-lg z-50 flex"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-lg shadow-lg p-3 h-80 flex justify-between">
                            <div className="overflow-auto w-62">
                                Notificaciones
                                {[...context.Notificaciones].reverse().map((result, index) => (
                                    <div key={index} className="p-2 my-1 border-b justify-between mx-4">
                                        <p className="font-bold text-blue-600">{result.plantilla}</p>
                                        <p className="text-black text-opacity-60 text-sm">
                                            Procesados : {result.procesado} correctos : {result.correctos} incorrectos : {result.incorrectos}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export { MyNotification };
