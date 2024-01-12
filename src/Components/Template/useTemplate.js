import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import Swal from 'sweetalert2';

/**
 * Generates the function comment for the useTemplate function.
 *
 * @return {object} An object containing the following functions:
 *   - plantillaSelect: A function that handles the selection of a template.
 *   - clickRefreshTemplates: A function that refreshes the templates.
 *   - urlImageTemplate: A function that sets the URL of the template image.
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
 * Generate the function comment for the given function body.
 *
 * @param {Event} e - The event object.
 * @return {void} This function does not return anything.
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
   * Generates new templates asynchronously.
   *
   * @param {type} tokenUser - the user token
   * @param {type} homeDataClientId - the ID of the home data client
   * @return {type} none
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
   * Clicks the "Refresh Templates" button and performs the following actions:
   * 1. Calls the "refreshTemplates" function with the "tokenUser" and "homeDataClient?.id" parameters.
   * 2. Calls the "newTemplates" function.
   * 3. Displays a success message using Swal.fire.
   *
   * @return {Promise<void>} A promise that resolves when all the actions are complete.
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
   * Sets the url template based on the target value.
   *
   * @param {Event} e - The event object containing the target value.
   * @return {void} This function does not return a value.
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