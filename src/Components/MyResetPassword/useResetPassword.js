import {  useState, useContext, useEffect, } from 'react';
import { MasivosContext } from '../../Context';
import { Modal, Toast } from '../../Utils/Modal';
import { handleResetPassword } from '../../Api/resetPassword';
import { handleNewPassword } from '../../Api/newPassword';

const useResetPassword = ({paramsJson}) => {

    const context = useContext(MasivosContext);

    const [email, setEmail] = useState(''); 
    const [showPasword, setShowPasword] = useState(false);

    const closeToast = () => {
        context.setShowResetPassword(false);
    };

    const sendResetPassword = async () => {
      console.log(email);
        if (email) { 
          const result = await handleResetPassword(email);
          console.log(result);
          context.setShowResetPassword(false);
          Modal('info', 'Correo enviado');
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value); 
    }

    useEffect(() => {
        if (Object.keys(paramsJson).length > 0) {
            setShowPasword(true);
        }
      }, [paramsJson]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const fields = Object.fromEntries(
            new window.FormData(e.target)
        )
        const response = await handleNewPassword(
            paramsJson.token, 
            fields.newPassword, 
            fields.repeatNewPassword, 
            paramsJson.email
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