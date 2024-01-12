import React from 'react'

/**
 * Renders a layout component with a title and children.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The children components to render.
 * @param {string} props.title - The title of the layout.
 * @return {JSX.Element} - The rendered layout component.
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

export { Layout }