import React, { useContext, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import { VariableTemplate } from '../variableTemplate';
import cel from '../../Assets/cel.svg';

const ImgTemplate = ({configStyle}) => {
  const context = useContext(MasivosContext);

  useEffect(() => {
    fetch(context.urlTemplate)
      .then(response => {
        if (response.ok && response.headers.get('Content-Type').includes('image')) {
          context.setIsImage(true);
        } else {
          context.setIsImage(false);
        }
      })
      .catch(error => {
        context.setIsImage(false);
      });
  }, [context.urlTemplate, context.setIsImage]);

  return (
    <>
      <div
        className={`w-full h-full ${configStyle ? 'bg-contain' : 'bg-cover'} bg-center bg-no-repeat`}
        style={{ backgroundImage: `url(${cel})` }}
      >
        <ul className={`${configStyle ? 'w-64' : 'w-64 '} h-full flex flex-col justify-between`}>
          <li className={`bg-[#008069] ${configStyle ? 'my-4 mx-9' : 'my-4 mx-6'} flex items-center`}>
            <img
              className={`${configStyle ? 'w-5 h-5' : 'w-7 h-7'}  rounded-full m-2 mr-2`}
              src={context.homeDataClient.attributes.image}
              alt="Client"
            />
            <p className="text-white text-xs">
              {context.homeDataClient.attributes.Client}
            </p>
          </li>
          <li className={`${configStyle ? 'ml-12 mr-9 mb-20' : 'ml-9 mr-4 mb-20'} text-xs bg-[#E2FFC7] p-3 rounded-lg`}>
            {(context.isImage && context.urlTemplate) ? (
              <div className={`${configStyle ? 'max-h-36' : 'max-h-48'}  overflow-y-auto scrollbar-hide`}>
                <img
                  src={context.urlTemplate}
                  alt="template"
                  className="max-w-full h-auto object-contain"
                />
              </div>
            ) : null}
            
            {(context.variables>0)?(

            <VariableTemplate 
            configStyle={true}
            body={context.getTemplates.find(({ name }) => name === context.plantilla)?.body}
            variables={context.variablesInputs}
            />

            ):(

            <div className={`${configStyle ? 'max-h-36' : 'max-h-48'} overflow-y-auto mt-1 scrollbar-hide mx-auto`}>
              <p>{context.getTemplates.find(({ name }) => name === context.plantilla)?.body}</p>
            </div>

          )}
          </li>
        </ul>
      </div>
    </>
  );
}

export { ImgTemplate };
