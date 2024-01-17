import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import Swal from 'sweetalert2';

/**
 * Genera el comentario de función para la función useTemplate.
 *
 * @return {object} Un objeto que contiene las siguientes funciones:
 *   - plantillaSelect: Una función que maneja la selección de una plantilla.
 *   - clickRefreshTemplates: Una función que actualiza las plantillas.
 *   - urlImageTemplate: Una función que establece la URL de la imagen de la plantilla.
 */
const useTemplate = () => {
    const { 
        getTemplates, 
        setPlantilla, 
        setUrlTemplate, 
        setUrlImage,
        refreshTemplates, 
        handleGetTemplate, 
        tokenUser, 
        homeDataClient,
        setIdPlantilla,
        setGetTemplates,
        setVariable
    } = useContext(MasivosContext);
  
/**
 * Genera el comentario de función para el cuerpo de la función.
 *
 * @param {Event} e - El objeto de evento.
 * @return {void} Esta función no devuelve nada.
 */
    const plantillaSelect = (e) => {
      const selectedTemplate = getTemplates.find(template => template.name === e.target.value);
      if (selectedTemplate) {
        console.log(selectedTemplate);
          setPlantilla(selectedTemplate.name);
          setUrlImage(selectedTemplate.url);
          setIdPlantilla(selectedTemplate.id);
          setVariable(selectedTemplate.variable)
      }
    }

  /**
   * Genera nuevas plantillas de forma asíncrona.
   *
   * @param {type} tokenUser - el token de usuario
   * @param {type} homeDataClientId - el ID del cliente de datos del hogar
   * @return {type} ninguno
   */
  const newTemplates = async () => {
    handleGetTemplate(tokenUser, homeDataClient?.id)
        .then((response) => {
      const templates = response.templates?.map((item) => {
        return item
      })
      setGetTemplates(templates || [])
    })
  }

  /**
   * Hace clic en el botón "Actualizar plantillas" y realiza las siguientes acciones:
   * 1. Llama a la función "refreshTemplates" con los parámetros "tokenUser" y "homeDataClient?.id".
   * 2. Llama a la función "newTemplates".
   * 3. Muestra un mensaje de éxito usando Swal.fire.
   *
   * @return {Promise<void>} Una promesa que se resuelve cuando se completan todas las acciones.
   */
  const clickRefreshTemplates = async () => {
    await Promise.all([
      refreshTemplates(tokenUser, homeDataClient?.id),
      newTemplates()
    ]);

    Swal.fire({
      icon: 'success',
      title: 'Actualizado',
    });
  };

  /**
   * Establece la URL de la plantilla según el valor de destino.
   *
   * @param {Event} e - El objeto de evento que contiene el valor de destino.
   * @return {void} Esta función no devuelve ningún valor.
   */
  const urlImageTemplate = (e) => {
    setUrlTemplate(e.target.value);
  };

  return {
    plantillaSelect,
    clickRefreshTemplates,
    urlImageTemplate
  };
};

export { useTemplate };