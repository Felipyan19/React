import {  useState, useContext, useEffect, } from 'react';
import { MasivosContext } from '../../Context';
import { Modal, Toast } from '../../Utils/Modal';
import { handleResetPassword } from '../../Api/resetPassword';
import { handleNewPassword } from '../../Api/newPassword';

/**
 * Genera el comentario de función para el cuerpo de la función dada en un bloque de código markdown
 * con la sintaxis de lenguaje correcta.
 *
 * @param {Object} params - un valor booleano que indica si mostrar el campo de contraseña
 * @return {Object} un objeto que contiene el email, closeToast, sendResetPassword,
 * handleEmailChange, showPasword y funciones handleSubmit
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
     * Envía un correo electrónico para restablecer la contraseña.
     *
     * @return {Promise} Una promesa que se resuelve cuando se envía el correo electrónico.
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
     * Maneja el evento de cambio del campo de entrada de correo electrónico.
     *
     * @param {Event} event - El objeto de evento que representa el evento de cambio.
     * @return {void} Esta función no devuelve nada.
     */
    const handleEmailChange = (event) => {

        setEmail(event.target.value); 

    }

    /**
     * Maneja la presentación del formulario de manera asíncrona.
     *
     * @param {Event} e - El evento de presentación del formulario.
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