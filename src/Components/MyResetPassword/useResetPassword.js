import {  useState, useContext, useEffect, } from 'react';
import { MasivosContext } from '../../Context';
import { Modal, Toast } from '../../Utils/Modal';
import { handleResetPassword } from '../../Api/resetPassword';
import { handleNewPassword } from '../../Api/newPassword';

/**
 * Generates the function comment for the given function body in a markdown code block
 * with the correct language syntax.
 *
 * @param {Object} params - an boolean value indicating whether to show the password field
 * @return {Object} an object containing the email, closeToast, sendResetPassword,
 * handleEmailChange, showPasword, and handleSubmit functions
 */
const useResetPassword = ({params}) => {

    const context = useContext(MasivosContext);

    const [email, setEmail] = useState(''); 
    const [showPasword, setShowPasword] = useState(false);

    const closeToast = () => {

        context.setShowResetPassword(false);

    };

    useEffect(() => {

        if(params) {
            setShowPasword(true);
            context.setShowResetPassword(true);
        }else {
            setShowPasword(false);
        }
        
    }, []);

    /**
     * Sends a reset password email.
     *
     * @return {Promise} A promise that resolves when the email is sent.
     */
    const sendResetPassword = async () => {

        if (email) { 
          Modal('info', 'Validando Datos');
          context.setShowResetPassword(false);
          const response = await handleResetPassword(email);
          response.status ? Modal('success', 'Correo enviado') : Modal('error', 'Error en la solicitud');
        }

    }

    /**
     * Handles the change event of the email input field.
     *
     * @param {Event} event - The event object representing the change event.
     * @return {void} This function does not return anything.
     */
    const handleEmailChange = (event) => {

        setEmail(event.target.value); 

    }

      /**
       * Handles the form submission asynchronously.
       *
       * @param {Event} e - The form submission event.
       */
      const handleSubmit = async (e) => {

        e.preventDefault();

        const querystring = window.location.search

        const params = new URLSearchParams(querystring)

        const fields = Object.fromEntries(
            new window.FormData(e.target)
        )

        const response = await handleNewPassword(
            params.get('token'), 
            fields.newPassword, 
            fields.repeatNewPassword, 
            params.get('email')
            )

        if (response.errors && response.errors.password) {
            Toast('error', response.errors.password.join(''));
        } else if (response.status) {
            Toast('success', 'Contraseña cambiada');
            context.setShowResetPassword(false);
        }
        if (response.email) {
            Toast('error', response.email);
        } else {
            Toast('success', 'Contraseña cambiada');
            context.setShowResetPassword(false);
        }

        if (window.history.pushState) {
            setShowPasword(false);
            let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({path: newUrl}, '', newUrl);
        }

    }

    return {
        email,
        closeToast,
        sendResetPassword,
        handleEmailChange,
        showPasword,
        handleSubmit
    }
}

export { useResetPassword }