import React, { useContext } from 'react';
import { RiRefreshLine } from "react-icons/ri";
import { MasivosContext } from '../../Context';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';


const Template = () => {
    const context = useContext(MasivosContext);

    return (
        <>
            <div className="text-sky-600 text-base font-semibold mb-2">Plantilla</div>
            <div className="text-black text-opacity-60 text-sm ">Escoje la plantilla que desea enviar verificada por meta. </div>
            <div className="flex items-center justify-between">
                <select
                    id="selectPlantilla"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2"
                    value={context.plantilla}
                    onChange={(e) => {
                        const selectedTemplate = context.getTemplates.find(template => template.name === e.target.value);
                        if (selectedTemplate) {
                            context.setPlantilla(selectedTemplate.name);
                            context.setUrlImage(selectedTemplate.url);
                        }
                    }}
                >
                    <option value={'Plantilla'}> Plantilla </option>
                    {context.getTemplates.map((template) => (
                        <option
                            value={template.name}
                            key={uuidv4()}
                        >
                            {template.name}
                        </option>
                    ))}
                </select>
                <div className='ml-2 flex justify-end text-3xl text-[#0096C8] font-bold'
                    onClick={() => {
                        context.refreshTemplates(context.tokenUser, context.homeDataClient?.id)
                        Swal.fire({
                            icon: 'success',
                            title: 'Actualizado',
                        })
                    }}
                >
                    <RiRefreshLine />
                </div>

            </div>
            {context.urlImage ? (
                <>
                    <p className="text-black text-opacity-60 text-sm ">
                        Ingrese la Url de la imagen de la plantilla
                    </p>
                    <input
                        id="MiUrl"
                        type="text"
                        placeholder="URL de la plantilla"
                        onChange={(e) => {
                            context.setUrlTemplate(e.target.value);
                        }}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:border-2 p-2 my-2"
                    />
                </>
            ) : (
                <p className="text-black text-opacity-60 text-sm my-6 mx-2">
                        Esta plantilla no posee una imagen
                </p>
                
            )}

        </>
    );
};

export { Template }