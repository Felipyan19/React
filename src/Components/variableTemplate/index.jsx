/**
 * Replaces placeholders in a template string with values from an array.
 *
 * @param {string} templateString - The template string containing placeholders.
 * @param {array} replacements - The array of replacement values.
 * @return {string} - The template string with placeholders replaced by values.
 */
const VariableTemplate = ({ configStyle, body, variables}) => {
  
    /**
     * Replaces placeholders in a template string with values from an array.
     *
     * @param {string} templateString - The template string containing placeholders.
     * @param {array} replacements - The array of replacement values.
     * @return {string} - The template string with placeholders replaced by values.
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
  export { VariableTemplate };
