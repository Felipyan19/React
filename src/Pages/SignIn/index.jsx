import { useContext, useState, useEffect } from 'react';
import { MasivosContext } from '../../Context';
import Logo from '../../Assets/logo.png';
import Login from '../../Assets/login.jpg';
import { MyResetPassword } from '../../Components/MyResetPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
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

  return (
    <div className="h-screen w-full flex md:justify-end" style={{ backgroundImage: `url(${Login})` }}>
      <div className="h-screen bg-white w-full md:w-2/5 flex justify-center items-center"
        style={{ borderTopLeftRadius: '4rem', borderBottomLeftRadius: '4rem' }}>

        <div className='items-center flex flex-col'>
          <img src={Logo} alt="Logo" className='w-3/5' />
          <h1 className='text-[#0096C8] text-4xl font-bold'>Masivos Whastapp</h1>
          <h2 className='text-[#212529] font-bold mt-4'>Iniciar sesión</h2>

          <form onSubmit={handleSubmit} 
           className="w-full max-w-sm items-center justify-center flex flex-col mt-2">
            <input
              type="email"
              name="email"
              id="email"
              value={context.email}
              onChange={handleEmailChange}
              className="h-10 w-full border-b-2 border-[#0096C8] mt-4 px-2"
              placeholder="Email"
              required />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"} name="password"
                value={context.password}
                onChange={handlePasswordChange}
                className="h-10 w-full border-b-2 border-[#0096C8] mt-5 px-2"
                placeholder="Contraseña"
                required />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-10 right-0 pr-3 flex items-center text-sm leading-5">
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash } />
              </button>
            </div>
            <button
              type="submit"
              className="bg-[#0096C8] text-white w-4/6 h-8 mt-8 rounded transition-colors duration-200">
              Ingresar
            </button>
          </form>
           <span className="text-[#212529] font-bold mt-4 text-xs">
             ¿Olvido su contraseña?  
            <a className="text-[#0096C8] ml-2 cursor-pointer"
              onClick={() => context.setShowResetPassword(true)}
              > 
              Click
              </a>
           </span>
           <MyResetPassword paramsJson={paramsJson}/>
        </div>
      </div>
    </div>
  );
}

export { SignIn };