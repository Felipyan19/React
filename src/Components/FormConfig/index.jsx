import { useContext, useEffect, useState } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Toast } from '../../Utils/Modal';

const FormConfig = ({ tokenUser, title, mode, fields, api, closeToast }) => {

    const context = useContext(MasivosContext);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCampaing, setSelectedCampaing] = useState('');

    useEffect(() => {
        const preSelectedUserIds = [];
        setSelectedUsers(preSelectedUserIds);
        console.log(context.getDataClients);
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

    return (
        <div id="toast-overlay" className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div
                className="relative mx-auto p-4 shadow-lg bg-[#f9f9f9] rounded-lg z-10 flex"
                onClick={(e) => e.stopPropagation()}
            >
                <IoIosCloseCircleOutline
                    className="absolute top-0 right-0 text-4xl text-black m-4 cursor-pointer"
                    onClick={closeToast}
                />
                <div className="shadow-lg p-6 w-80">
                    <h1 className="text-2xl text-[#0096C8]">{title}</h1>
                    <form className="grid grid-cols-1 gap-6 mt-4" onSubmit={handleSubmit} encType="multipart/form-data">
                        {fields.map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                    {field}
                                </label>
                                {field === 'image' ? (
                                    <input
                                        type="file"
                                        id={field}
                                        name={field}
                                        className="form-input block w-full text-sm text-gray-700
                 border border-gray-300 rounded-md 
                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : field === 'users' || field === 'Campaña' ? (
                                    <select
                                        id={field}
                                        name={field}
                                        className="form-select block w-full text-sm text-gray-700
                 border border-gray-300 rounded-md 
                 focus:ring-blue-500 focus:border-blue-500"
                                        multiple={field === 'users'}
                                        onChange={field === 'users' ? handleUserSelection : handleCampañaSelection}
                                        value={field === 'users' ? selectedUsers : selectedCampaing}
                                    >
                                        {field === 'users'
                                            ? context.getDataUsers.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.attributes.name}
                                                </option>
                                            ))
                                            : context.getDataClients.map((client) => (
                                                <option key={client.id} value={client.id}>
                                                    {client.attributes.Client}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        className="form-input block w-full text-sm text-gray-700
                 border border-gray-300 rounded-md
                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                )}
                            </div>
                        ))}
                        <button className=" bg-[#0096C8] text-white w-4/6 h-8 rounded transition-colors duration-200 mb-2" type="submit">
                            Enviar
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export { FormConfig };