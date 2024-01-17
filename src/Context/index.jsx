import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  handleCampains, 
  handleLogin, 
  handleUser, 
  handleClient , 
  handleGetTemplate, 
  handleSendTemplate, 
  refreshTemplates,
  handleSendMensaje,
  handleTokenRefresh,
  handleSendEmail
} from '../Api';

import { newTokenClients } from '../Api/newTokenClients'
import { updClientsUser } from '../Api/updClientsUser'
import { Modal } from '../Utils/Modal';

// Crea un contexto para la aplicación Masivos
export const MasivosContext = createContext();

/**
 * Exporta un componente proveedor que envuelve a los elementos hijos dados
 * y proporciona un contexto para gestionar el estado y los datos relacionados con la aplicación Masivos.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos que se envuelven.
 * @return {ReactElement} El componente envuelto.
 */
export const MasivosProvider = ({ children }) => {
  // Hook de navegación
  const navigate = useNavigate();
  
  // Variables de estado para la autenticación del usuario
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({});
  const [plantilla, setPlantilla] = useState('');
  const [tokenUser, setTokenUser] = useState('');
  const [getTemplates, setGetTemplates] = useState([]);
  const [urlTemplate, setUrlTemplate] = useState('');
  const [numeroEjemplo,setNumeroEjemplo] = useState(0);
  const [isImage, setIsImage] = useState(false);
  const [startSend, setStartSend] = useState(false);

  // Variables de estado para los datos del cliente
  const [getDataClient, setGetDataClient] = useState(false);
  const [getDataClients, setGetDataClients] = useState([]);
  const [homeDataClient, setHomeDataClient] = useState({});
  
  // Variables de estado para la configuración del formulario
  const [fieldsFormConfig, setFieldsFormConfig] = useState(
    {
      'Usuarios': {
        'Crear': { fields: ['name', 'email', 'password'], api: handleUser },
      },
      'Campañas': {
        'Crear': { fields: ['name', 'token_meta', 'phone_id', 'waba_id', 'users', 'image'], api: handleClient },
      },
      'Cambiar token': {
        'Crear': { fields:['Campaña', 'nuevo token'], api: newTokenClients }
      },
      'Usuario por Campaña': {
        'Crear': { fields:['Campaña', 'users'], api: updClientsUser }
      }
    });

  // Variables de estado para detalles de Excel, notificaciones y otros
  const [detailsExcel, setDetailsExcel] = useState([]);
  const [excelLength, setExcelLength] = useState(0);
  const [Notificaciones, setNotificaciones] = useState([]);
  const [urlImage, setUrlImage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [detailSend, setDetailSend] = useState({});
  const [dataError, setDataError] = useState([]);
  const [sendHistory, setSendHistory] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [numberFail, setNumberFail] = useState(false);
  const [isRuning, setIsRuning] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false);
  const [newNotifications, setNewNotifications] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [idPlantilla, setIdPlantilla] = useState('');
  const [variables, setVariable] = useState(0);
  const [variablesInputs, setVariablesInputs] = useState({});
  const [getDataUsers, setGetDataUsers] = useState([])

  // Efecto para manejar el inicio de sesión cuando submitButtonClicked cambia
  useEffect(() => {
    if (email !== '' && password !== '' && submitButtonClicked === true) {
      Modal('question', 'Validando credenciales...');
      handleLogin(email, password).then(result => {
        if (result?.data && result.data?.attributes?.name) {
          const welcome = '¡Bienvenido! ' + result.data.attributes.name;
          Modal('success', welcome);
          setTokenUser(result.data.attributes.token);
          setUserLogin(result.data);
          setLogin(true);
          navigate('/Menu');
        } else {
          Modal('error', 'Credenciales incorrectas');
          setSubmitButtonClicked(false);
        }
      })
    }
  }, [submitButtonClicked]);

  // Efecto para manejar la actualización del token
  useEffect(() => {
    const refreshToken = () => {
      setIsRefresh(true);
      setTimeout(() => {
        handleTokenRefresh(tokenUser).then(result => {
          if (result && result.token) {
            setTokenUser(result.token);
            console.log('Nuevo token:', result.token);
          }
        }).catch(error => {
          console.error('Error al actualizar el token:', error);
        }).finally(() => {
          setIsRefresh(false);
        });
      }, 500); 
    };

    const intervalId = setInterval(refreshToken, 20 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [tokenUser]);

  // Devuelve el proveedor de contexto de Masivos con los valores y funciones de estado
  return (
    <MasivosContext.Provider
      value={{
        tokenUser,
        setTokenUser,
        login,
        setLogin,
        email,
        setEmail,
        password,
        setPassword,
        submitButtonClicked,
        setSubmitButtonClicked,
        userLogin,
        setUserLogin,
        getDataClient,
        setGetDataClient,
        getDataClients,
        setGetDataClients,
        homeDataClient,
        setHomeDataClient,
        plantilla,
        setPlantilla,
        fieldsFormConfig,
        setFieldsFormConfig,
        handleGetTemplate,
        getTemplates,
        setGetTemplates,
        urlTemplate,
        setUrlTemplate,
        handleSendTemplate,
        numeroEjemplo,
        setNumeroEjemplo,
        refreshTemplates,
        isImage,
        setIsImage,
        handleSendMensaje,
        detailsExcel,
        setDetailsExcel,
        excelLength,
        setExcelLength,
        Notificaciones,
        setNotificaciones,
        urlImage,
        setUrlImage,
        handleCampains,
        showToast,
        setShowToast,
        detailSend,
        setDetailSend,
        dataError,
        setDataError,
        startSend,
        setStartSend,
        sendHistory,
        setSendHistory,
        showNotification,
        setShowNotification,
        numberFail,
        setNumberFail,
        isRuning,
        setIsRuning,
        isRefresh,
        setIsRefresh,
        newNotifications,
        setNewNotifications,
        handleSendEmail,
        showResetPassword,
        setShowResetPassword,
        idPlantilla,
        setIdPlantilla,
        variables,
        setVariable,
        variablesInputs,
        setVariablesInputs,
        getDataUsers,
        setGetDataUsers
      }}
    >
      {children}
    </MasivosContext.Provider>
  );
};
