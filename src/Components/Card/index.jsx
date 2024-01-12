import { useContext } from 'react'
import { MasivosContext } from '../../Context'
import { useNavigate } from 'react-router-dom'

/**
 * Renders a card component with client data.
 *
 * @param {Object} data - The data object containing client information.
 * @return {JSX.Element} The rendered card component.
 */
const Card = ({ data }) => {
  
  const context = useContext(MasivosContext)
  const navigate = useNavigate();

  /**
   * Shows the given data.
   *
   * @param {type} data - the data to be shown
   * @return {type} undefined
   */
  const show = (data) => {
    context.setHomeDataClient(data)
    navigate('/Home');
  }
  
  /**
   * Handles the error when loading an image.
   *
   * @param {Event} e - The event object containing information about the error.
   * @return {void} This function does not return a value.
   */
  const handleImageError = (e) => {
    e.target.src = 'path/to/default/image.jpg'; // replace with your default image path
  }

  return (
    <div 
      className='flex flex-col bg-white cursor-pointer p-3 shadow-lg hover:shadow-2xl transition-shadow duration-200 rounded-lg transform hover:scale-105'
      onClick={() => show(data)}
      role="button"
      aria-label="Show details"
    >
      <div className='w-52 h-48 relative overflow-hidden rounded-lg'>
        <img 
          className='w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-200' 
          src={data?.attributes.image}
          alt='Client' 
          onError={handleImageError}
        />
      </div>
      <div className='mt-4'>
        <p className='text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200'>
          {data?.attributes.Client}
        </p>
        <p className='text-gray-500 mt-2'>
          ID: {data?.id}
        </p>
      </div>
    </div>
  )
}

export { Card }