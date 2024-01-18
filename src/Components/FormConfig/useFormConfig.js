import { useEffect, useState } from 'react';
import { Toast } from '../../Utils/Modal';


/**
 * Genera la configuración del formulario para el hook useForm.
 *
 * @param {Object} options - Las opciones para la configuración del formulario.
 * @param {string} options.tokenUser - El token del usuario.
 * @param {string} options.title - El título del formulario.
 * @param {Function} options.api - La función de la API a ser llamada.
 * @param {Function} options.closeToast - La función para cerrar el mensaje.
 * @return {Object} El objeto de configuración del formulario.
 */
const useFormConfig = ({ tokenUser, title, api, closeToast }) => {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCampaing, setSelectedCampaing] = useState('');

    useEffect(() => {
        const preSelectedUserIds = [];
        setSelectedUsers(preSelectedUserIds);
    }, []);

    /**
     * Maneja el evento de selección de usuario.
     *
     * @param {Event} e - El objeto de evento que representa la selección de usuario.
     * @return {void} Esta función no devuelve nada.
     */
    const handleUserSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedUsers((prevSelectedUsers) => {
            const updatedSelection = prevSelectedUsers.includes(selectedOptions[0])
                ? prevSelectedUsers.filter((user) => !selectedOptions.includes(user))
                : [...prevSelectedUsers, ...selectedOptions];
            return updatedSelection;
        });
    };

    /**
     * Maneja la selección de una campaña.
     *
     * @param {Event} e - El objeto de evento que representa el evento de selección.
     * @return {void} No hay valor de retorno.
     */
    const handleCampañaSelection = (e) => {
        setSelectedCampaing(e.target.value);
    }

    /**
     * Maneja la presentación del formulario.
     *
     * @param {Event} e - El objeto de evento.
     * @return {Promise<void>} Devuelve una promesa que se resuelve a indefinido.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new window.FormData(e.target);
        const formFields = Object.fromEntries(Array.from(formData.entries()));
        const users = selectedUsers || [];
        formFields.tokenUser = tokenUser;
        formFields.users = users;

        const response = await api(formFields);

        if (response.id) {
            closeToast();
            if (response.type === 'User') {
                Toast('success', `El usuario ${response.attributes.name} ha sido creado correctamente. ${response.id}`);
            }
            if (response.type === 'Client') {
                if (title === 'Campañas') {
                    Toast('success', `La campaña ${response.attributes.Client} ha sido creado correctamente. ${response.id}`);
                } else {
                    Toast('success', `La campaña ${response.attributes.Client} ha cambiado su token correctamente. ${response.id}`);
                }
            }
        } else {
            Toast('error', response.message);
        }

    };

    return {
        selectedUsers,
        selectedCampaing,
        handleUserSelection,
        handleCampañaSelection,
        handleSubmit
    }
}

export { useFormConfig };