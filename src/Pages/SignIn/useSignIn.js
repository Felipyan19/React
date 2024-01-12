import { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';

const useSignIn = () => {

    const context = useContext(MasivosContext);
    const [showPassword, setShowPassword] = useState(false);
    const [paramsJson, setParamsJson] = useState({});

    const handleEmailChange = (e) => {
      context.setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      context.setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      context.setSubmitButtonClicked(true);
    };
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search) || {};
      
      queryParams.forEach((value, key) => {
        paramsJson[key] = value;
        setParamsJson(paramsJson);
      });
  
      if (queryParams.toString()) {
        context.setShowResetPassword(true);
      }
    }, []);
  
    const handleResetPassword = () => {
      context.setShowResetPassword(true)
    }
  
    return { 
      handleEmailChange, 
      handlePasswordChange, 
      handleSubmit, 
      showPassword, 
      toggleShowPassword, 
      handleResetPassword, 
      paramsJson 
    }
  }

  export { useSignIn }