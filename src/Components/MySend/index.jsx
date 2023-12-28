import React, { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import { ImgTemplate } from '../../Components/ImgTemplate';
import { IoIosCloseCircleOutline } from "react-icons/io"; 

const MySend = () => {
    const context = useContext(MasivosContext);
    

    const showCustomToast = () => {
        context.setShowToast(true);
    };

    const closeToast = () => {
        context.setShowToast(false);
    };

    const handleOutsideClick = (event) => {
        if (event.target.id === "toast-overlay") {
            closeToast();
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <>
            {context.showToast && (
                <div
                    id="toast-overlay"
                    className="fixed inset-0 flex items-center justify-center z-50"
                    onClick={closeToast}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div
                        className="relative mx-auto p-5 shadow-lg bg-[#f9f9f9] rounded-lg z-10 flex"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IoIosCloseCircleOutline
                            className="absolute top-0 right-0 text-4xl text-white m-4 cursor-pointer"
                            onClick={closeToast}
                        />
                        <div className="flex justify-center">
                            <ImgTemplate configStyle={true} />
                        </div>
                        <div className="mt-4">
                            <div className="bg-white rounded-lg shadow-lg p-7 h-96 flex flex-col justify-between">
                                <section className="text-sky-600 text-base font-semibold">
                                    <h2>
                                        Elementos procesados
                                    </h2>
                                    <p className="text-black text-opacity-60 text-sm">
                                        {context.detailSend.procesado}
                                    </p>
                                </section>
                                <section className="text-sky-600 text-base font-semibold mt-4">
                                    <h2>Elementos correctos</h2>
                                    <p className="text-black text-opacity-60 text-sm">
                                        {context.detailSend.correctos}
                                    </p>
                                </section>
                                <section className="text-sky-600 text-base font-semibold mt-4">
                                    <h2>Elementos fallidos</h2>
                                    <p className="text-black text-opacity-60 text-sm">
                                        {context.detailSend.incorrectos}
                                    </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export { MySend };