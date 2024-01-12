import React from 'react';
import LogoError from '../../Assets/dd.png';
import logoCCG from '../../Assets/logo.png';
const NotFound = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gray-300">
            <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800">Oops!</h3>
                <div className='flex'>
                    <div>
                        <img src={LogoError} alt="Logo" className="w-30 mx-30"/>
                        <p className="text-gray-600">
                            Imagen de 
                            <a href="https://www.freepik.com/vectors/business" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> Freepik</a>
                        </p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img src={logoCCG} alt="Logo" className="w-30 mx-30"/>
                        <h1 className="text-5xl font-bold text-gray-800">Página no encontrada</h1>
                        <p className="text-gray-600 mt-4">Lo siento, la página solicitada no existe</p>
                        <a href="/" className="mt-12 inline-block px-6 py-2 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Ir a inicio</a>
                        </div>
                    </div>
            </div>
        </section>
    );
}

export { NotFound };