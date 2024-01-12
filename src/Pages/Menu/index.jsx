import { useContext, useEffect } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { Card } from '../../Components/Card';
import { Layout } from '../../Components/Layout';
import 'react-loading-skeleton/dist/skeleton.css'
import MyLoader from '../../Utils/MyLoader/index.jsx';

/**
 * Renders the Menu component.
 *
 * @return {React.Element} The rendered Menu component.
 */
const Menu = () => {
    const context = useContext(MasivosContext);

    useEffect(() => {
        context.setGetDataClients([]);
        context.handleCampains(context.tokenUser)
            .then(result => {
                context.setGetDataClients(result.data);
            });
    }, []);


    /**
     * Renders the view based on the filtered data.
     *
     * @return {JSX.Element} The rendered view.
     */
    const renderView = () => {

        const filteredData = context.getDataClients.filter(item =>
            item.attributes.users.includes(context.userLogin.attributes.name));

        if (context.getDataClients && filteredData?.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {filteredData.map((item) => (
                        <div className="mb-4 mx-5" 
                           key={item.id} 
                           >
                            <Card data={item} />
                        </div>
                    ))
                    }
                    
                </div>
            );
        } else {
            return (
                <div className="mt-8">
                    <svg
                        className="w-16 h-16 text-gray-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <div className="text-center text-xl font-semibold mt-6">Ningún servicio disponible</div>
                    <p className="text-gray-500 mt-6">
                        Lo sentimos, actualmente no hay servicios disponibles. Vuelve más tarde.
                    </p>
                </div>
            );
        }
    }

    
    /**
     * Render a skeleton component.
     *
     * @return {JSX.Element} The skeleton component.
     */
    const renderSkeleton = () => {
        return (
            <div className="mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    <MyLoader />
                    <MyLoader />
                    <MyLoader />
                    <MyLoader />
                </div>
            </div>
        )
    }
    return (
        <Layout title={'Menu'}>
            {(context.getDataClients.length > 0) ? renderView() : renderSkeleton()}
        </Layout>
    );
}

export { Menu }