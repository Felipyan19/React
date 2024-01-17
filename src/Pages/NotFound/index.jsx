import React from 'react';
import LogoError from '../../Assets/404-min.webp';

/**
 * Renderiza un componente para cuando no se encuentra una página.
 *
 * @return {JSX.Element} Un componente de React que representa la página de "No encontrada".
 */
const NotFound = () => {
    return (
        <section className="h-screen">
            <div className="h-full w-full">
                <img src={LogoError} alt="Logo" className="w-auto mx-auto h-auto"/>
            </div>
        </section>
    );
}

export { NotFound };