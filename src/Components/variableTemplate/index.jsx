const VariableTemplate = ({ configStyle, body, variables}) => {
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
