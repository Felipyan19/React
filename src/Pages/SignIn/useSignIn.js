import { useContext, useState } from 'react';
import { MasivosContext } from '../../Context';

/**
 * Genera un hook personalizado para manejar la funcionalidad de inicio de sesión.
 *
 * @return {Object} Un objeto que contiene varias funciones y variables de estado relacionadas con el inicio de sesión.
 */
const useSignIn = () => {

    const context = useContext(MasivosContext);
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Maneja el evento de cambio para el campo de entrada de correo electrónico.
     *
     * @param {Event} e - El objeto de evento de cambio.
     * @return {void} Esta función no devuelve nada.
     */
    const handleEmailChange = (e) => {
      context.setEmail(e.target.value);
    };
  
     /**
     * Maneja el evento de cambio para el campo de entrada de contraseña.
     *
     * @param {Event} e - El objeto de evento de cambio.
     */
    const handlePasswordChange = (e) => {
      context.setPassword(e.target.value);
    };
  
     /**
     * Envía el formulario cuando es desencadenado por un evento.
     *
     * @param {Event} e - El evento que desencadenó el envío del formulario.
     * @return {void} Esta función no devuelve ningún valor.
     */
    const handleSubmit = (e) => {
      e.preventDefault();
      context.setSubmitButtonClicked(true);
    };
  
    /**
     * Alterna la visibilidad de la contraseña.
     *
     * @return {void} 
     */
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
  
   /**
     * Restablece la contraseña del usuario.
     *
     * @param {} - No se requieren parámetros.
     * @return {} - Sin valor de retorno.
     */
    const handleResetPassword = () => {
      context.setShowResetPassword(true)
    }
  
    return { 
      handleEmailChange, 
      handlePasswordChange, 
      handleSubmit, 
      toggleShowPassword, 
      handleResetPassword,
      showPassword 
    }
  }

  export { useSignIn }