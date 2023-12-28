import React, { useContext } from 'react';
import { FcRefresh } from "react-icons/fc";
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
                    value={context.plantilla} // Utiliza el estado para controlar el valor actual
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
                <FcRefresh className='m-2 text-3xl text-[#0096C8] cursor-pointer' onClick={() => {
                    context.refreshTemplates(context.tokenUser, context.homeDataClient?.id)
                    Swal.fire({
                        icon: 'success',
                        title: 'Actualizado',
                    })
                }} />
            </div>
            <>
                <p className="text-black text-opacity-60 text-sm ">
                    Ingrese la URL de la plantilla.
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

        </>
    );
};

export { Template }