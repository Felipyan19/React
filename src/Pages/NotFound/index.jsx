import React from 'react';
import LogoError from '../../Assets/404-min.webp';

/**
 * Renders a component for when a page is not found.
 *
 * @return {JSX.Element} A React component representing the "Not Found" page.
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