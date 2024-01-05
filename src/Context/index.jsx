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
  handleTokenRefresh
} from '../Api';
import { Modal } from '../Utils/Modal';

export const MasivosContext = createContext();

export const MasivosProvider = ({ children }) => {

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

  const navigate = useNavigate();

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

  const [getDataClient, setGetDataClient] = useState(false);
  const [getDataClients, setGetDataClients] = useState([]);


  const [homeDataClient, setHomeDataClient] = useState({});
  

  const [fieldsFormConfig, setFieldsFormConfig] = useState(
    {
      'Usuarios': {
        'Crear': { fields: ['name', 'email', 'password'], api: handleUser },
      },
      'Campañas': {
        'Crear': { fields: ['name', 'token_meta', 'phone_id', 'waba_id', 'users', 'image'], api: handleClient },
      },
      'Usuarios por campañas': {
        'Crear': { fields: ['name', 'token_meta', 'phone_id', 'waba_id', 'users', 'image'], api: handleClient },
      }
    });

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

    const [newNotifications, setNewNotifications] = useState(false);

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
        setNewNotifications
      }}
    >
      {children}
    </MasivosContext.Provider>
  );
};
