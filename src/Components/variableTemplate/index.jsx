import PropTypes from 'prop-types';
/**
 * Reemplaza marcadores de posición en una cadena de plantilla con valores de un array.
 *
 * @param {string} templateString - La cadena de plantilla que contiene marcadores de posición.
 * @param {array} replacements - El array de valores de reemplazo.
 * @return {string} - La cadena de plantilla con marcadores de posición reemplazados por valores.
 */
const VariableTemplate = ({ configStyle, body, variables}) => {
  
  /**
   * Reemplaza marcadores de posición en una cadena de plantilla con valores de un array.
   *
   * @param {string} templateString - La cadena de plantilla que contiene marcadores de posición.
   * @param {array} replacements - El array de valores de reemplazo.
   * @return {string} - La cadena de plantilla con marcadores de posición reemplazados por valores.
   */
    function replaceTemplatePlaceholders(templateString, replacements) {
        return templateString.replace(/\{\{(\d+)\}\}/g, (match, index) => {
          return replacements[index] !== undefined ? replacements[index] : match;
        });
      }
      const updatedMessage = replaceTemplatePlaceholders(body, variables);
  return (
    <div className={`${configStyle ? 'max-h-36' : 'max-h-48'} overflow-y-auto mt-1 scrollbar-hide mx-auto`}>
      <p>{updatedMessage}</p>
    </div>
  );
}

VariableTemplate.propTypes = {
  configStyle: PropTypes.bool.isRequired,
  body: PropTypes.string.isRequired,
  variables: PropTypes.object.isRequired,
};

export { VariableTemplate };
