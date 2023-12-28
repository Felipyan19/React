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
  handleSendMensaje
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

  const navigate = useNavigate();

  useEffect(() => {
    
    if (email !== '' && password !== '' && submitButtonClicked === true) {
          Modal('question', 'Validando credenciales...');
      handleLogin(email, password).then(result => {
        if (result.data && result.data?.attributes?.name) {
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
      }
    });

  const [detailsExcel, setDetailsExcel] = useState([]);
  const [excelLength, setExcelLength] = useState(0);

  useEffect(() => {
    if(detailsExcel.length === excelLength){
      console.log('soy respuestas : '+detailsExcel);
      setNotificaciones(prevDetails => [
        ...prevDetails, 
        {titulo:'Envio Completado',texto:detailsExcel.length+' registros cargados'},
    ]);
    }
  },[detailsExcel])

  const [Notificaciones, setNotificaciones] = useState([
    {titulo:'Cargue exitoso',texto:'Masivos dibanka-superApp'},
    {titulo:'Cargue Fallido',texto:'Masivos dibanka-otrapantilla'},
    {titulo:'Cargue Fallido',texto:'Masivos dibanka-ay yayai'},
  ]);

  const [urlImage, setUrlImage] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [detailSend, setDetailSend] = useState({});

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
      }}
    >
      {children}
    </MasivosContext.Provider>
  );
};
