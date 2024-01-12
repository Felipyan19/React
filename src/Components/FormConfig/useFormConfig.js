import { useEffect, useState } from 'react';
import { Toast } from '../../Utils/Modal';
const useFormConfig = ({ tokenUser, title, api, closeToast }) => {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCampaing, setSelectedCampaing] = useState('');

    useEffect(() => {
        const preSelectedUserIds = [];
        setSelectedUsers(preSelectedUserIds);
    }, []);

    const handleUserSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedUsers((prevSelectedUsers) => {
            const updatedSelection = prevSelectedUsers.includes(selectedOptions[0])
                ? prevSelectedUsers.filter((user) => !selectedOptions.includes(user))
                : [...prevSelectedUsers, ...selectedOptions];
            return updatedSelection;
        });
    };

    const handleCampañaSelection = (e) => {
        setSelectedCampaing(e.target.value);
    }

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