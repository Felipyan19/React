import PropTypes from 'prop-types';
/**
 * Renderiza un componente de diseño con un título y sus hijos.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {ReactNode} props.children - Los componentes hijos a renderizar.
 * @param {string} props.title - El título del diseño.
 * @return {JSX.Element} - El componente de diseño renderizado.
 */
const Layout = ({ children, title }) => {
 
  return (
    <div className='mt-40 mb-20 flex flex-col container mx-auto'>
      <div className={`flex flex-col mx-auto overflow-y-auto scrollbar-hide` }>
        <h1 className={`text-4xl font-bold text-[#0096C8] mb-12 text-center`}>
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export { Layout }