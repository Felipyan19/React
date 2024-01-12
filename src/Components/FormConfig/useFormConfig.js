import { useEffect, useState } from 'react';
import { Toast } from '../../Utils/Modal';


/**
 * Generate the form configuration for the useForm hook.
 *
 * @param {Object} options - The options for the form configuration.
 * @param {string} options.tokenUser - The token of the user.
 * @param {string} options.title - The title of the form.
 * @param {Function} options.api - The API function to be called.
 * @param {Function} options.closeToast - The function to close the toast.
 * @return {Object} The form configuration object.
 */
const useFormConfig = ({ tokenUser, title, api, closeToast }) => {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCampaing, setSelectedCampaing] = useState('');

    useEffect(() => {
        const preSelectedUserIds = [];
        setSelectedUsers(preSelectedUserIds);
    }, []);

    /**
     * Handles the user selection event.
     *
     * @param {Event} e - The event object representing the user selection.
     * @return {void} This function does not return anything.
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
     * Handles the selection of a campaign.
     *
     * @param {Event} e - The event object representing the selection event.
     * @return {void} No return value.
     */
    const handleCampañaSelection = (e) => {
        setSelectedCampaing(e.target.value);
    }

    /**
     * Handles the form submission.
     *
     * @param {Event} e - The event object.
     * @return {Promise<void>} Returns a promise that resolves to undefined.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new window.FormData(e.target);
        const formFields = Object.fromEntries(Array.from(formData.entries()));
        const users = selectedUsers || [];
        formFields.tokenUser = tokenUser;
        formFields.users = users;
        console.log(formFields);
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