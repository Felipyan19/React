import React from "react"
import ContentLoader from "react-content-loader"

/**
 * Genera un comentario de función para el cuerpo de la función proporcionada.
 *
 * @param {Object} props - las props pasadas al componente MyLoader.
 * @return {ReactElement} - el componente ContentLoader renderizado.
 */
const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={250}
    height={260}
    viewBox="0 0 400 460"
    backgroundColor="#c7c7c7"
    foregroundColor="#f2f2f2"
    {...props}
  >
    <rect x="67" y="-17" rx="2" ry="2" width="338" height="393" /> 
    <rect x="67" y="387" rx="0" ry="0" width="327" height="26" /> 
    <rect x="68" y="425" rx="0" ry="0" width="196" height="24" />
  </ContentLoader>
)

export default MyLoader
