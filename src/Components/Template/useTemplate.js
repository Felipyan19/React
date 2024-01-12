import { useContext } from 'react';
import { MasivosContext } from '../../Context';
import Swal from 'sweetalert2';
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

  const newTemplates = async () => {
    handleGetTemplate(tokenUser, homeDataClient?.id)
        .then((response) => {
      const templates = response.templates?.map((item) => {
        return item
      })
      setGetTemplates(templates || [])
    })
  }

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