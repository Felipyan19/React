import React, { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import { ImgTemplate } from '../../Components/ImgTemplate';
import { IoIosCloseCircleOutline } from "react-icons/io";

const MySend = () => {
    const context = useContext(MasivosContext);

    const closeToast = () => {
        context.setExcelLength('0');
        context.setShowToast(false);
        const plantillaNotificaciones = context.detailSend;
        plantillaNotificaciones.plantilla = context.plantilla;
        context.setNotificaciones(prevData => 
            [...prevData, plantillaNotificaciones]);
        context.setDetailSend({ procesado: '0', correctos: '0', incorrectos: '0' });
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

    const startStop = () => {
        context.setStartSend(true);
    }
    const numberFail = () => {
        context.setNumberFail(!context.numberFail);
        console.log('enter');
    }

    return (
        <>
            {context.showToast && (
                <div
                    id="toast-overlay"
                    className="fixed inset-0 flex items-center justify-center z-50 "
                    onClick={closeToast}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div
                        className="relative mx-auto p-4 shadow-lg bg-[#f9f9f9] rounded-lg z-10 flex"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <IoIosCloseCircleOutline
                            className="absolute top-0 right-0 text-4xl text-white m-4 cursor-pointer"
                            onClick={closeToast}
                        />
                        <div className="flex justify-center ">
                            <ImgTemplate configStyle={true} />
                        </div>
                        <div className="">
                            <div className="bg-white rounded-lg shadow-lg p-3 flex justify-between m-1 ">
                                <section className="w-22 text-sky-600 text-base font-semibold border rounded-lg m-1 p-2">
                                    <h2>
                                        Procesados
                                    </h2>
                                    <p className="text-black text-opacity-60 text-sm border-b border-sky-600">
                                        {context.detailSend.procesado}
                                    </p>
                                </section>
                                <section className="w-24 text-sky-600 text-base font-semibold border rounded-lg m-1 p-2">
                                    <h2>Correctos</h2>
                                    <p className="text-black text-opacity-60 text-sm border-b border-green-600">
                                        {context.detailSend.correctos}
                                    </p>
                                </section>
                                <section className="w-24 text-sky-600 text-base font-semibold border rounded-lg m-1 p-2">
                                    <h2>Fallidos</h2>
                                    <p className="text-black text-opacity-60 text-sm border-b border-red-600">
                                        {context.detailSend.incorrectos}
                                    </p>
                                </section>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-3 h-80 flex justify-between">
                            <div className="overflow-auto w-80">

                                {!context.numberFail ? (
                                    [...context.sendHistory].reverse().map((result, index) => (
                                    <div key={index} className="p-2 my-1 border-b flex justify-between mx-4">
                                        <p className={result.attributes?.code_status ? "text-green text-opacity-60 text-sm" : "text-red-600 text-opacity-60 text-sm"}>
                                        estado : {result.attributes?.code_status || '400'}
                                        </p>
                                        <p className="text-black text-opacity-60 text-sm">
                                        numero : {result.attributes?.wa_id || result?.wa_id}
                                        </p>
                                    </div>
                                    ))
                                ) : ( 
                                    [...context.dataError].reverse().map((result, index) => (
                                    <div key={index} className="p-2 my-1 border-b flex justify-between mx-4">
                                        <p className={result.attributes?.code_status ? "text-green text-opacity-60 text-sm" : "text-red-600 text-opacity-60 text-sm"}>
                                        soy : {result.attributes?.code_status || '400'}
                                        {console.log('hola mundo'.result)}
                                        </p>
                                        <p className="text-black text-opacity-60 text-sm">
                                        soy : {result.attributes?.wa_id || result?.wa_id}
                                        </p>
                                    </div>
                                    ))
                                )}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-4 m-1   flex justify-between items-center">
                                
                                {(context.detailSend.procesado === context.excelLength && 
                                    context.detailSend.incorrectos !== '0') ?
                                    <button className="bg-sky-600 text-white rounded-lg p-2" onClick={numberFail}>
                                        Numeros Erroneos
                                    </button>
                                    : <button className="bg-sky-600 text-white rounded-lg p-2" onClick={startStop}>
                                    Parar
                                </button>
                                }
                                <div className='items-center'>
                                    <div className='flex items-center text-sky-600'>
                                        {!(context.detailSend.procesado === context.excelLength) && 
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                                        </svg>}
                                        <p>
                                            {context.detailSend.procesado} / {context.excelLength}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export { MySend };
