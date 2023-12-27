import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MasivosContext } from '../../Context';
import { Modal } from '../../Utils/Modal';
import Logoh from '../../assets/logo-header.png';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import Swal from 'sweetalert2';

const Navbar = () => {
  const context = useContext(MasivosContext);
  const name = context.userLogin?.attributes?.name;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textNotifications = () => {
    return context.Notificaciones.map((item, index) => (
      `<div key=${index} class="border rounded-lg p-2 m-2" ><h1 class="font-bold m-2">${item.titulo}</h1><h3>${item.texto}</h3></div>`
    ));
  };

  const toast = () => {
    const ToastSwal = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
    });
    ToastSwal.fire({
      icon: '',
      title: 'Notificaciones',
      html: textNotifications().join(''),
    });
    context.setNotificaciones([]);
    console.log('hola mundo '+  context.detailsExcel?.length );
  }

  const restore = () => {
    context.setGetDataClient(false);
    context.setSubmitButtonClicked(false);
    context.setGetDataClients([]);
    context.setLogin(false);
    Modal('info', 'Sesión cerrada');
  };

  return context.login ? (
    <nav className={`bg-[#0096C8] fixed z-10 top-0 w-full h-28 text-sm font-light ${isScrolled ? 'shadow' : ''}`}>
      <div className="container mx-auto m-3">
        <div className="flex justify-between items-center">
          
          <ul className="flex items-center gap-6">
            <li className="font-semibold text-lg">
              <NavLink to="/Menu" className="text-blue-500 hover:underline">
                <img src={Logoh} className="w-[187px] h-[92px]" alt="Logo" />
              </NavLink>
            </li>
          </ul>

          <ul className="flex items-center gap-6">

          <li className="text-white flex items-center text-xl gap-2">
              <FaUserCircle className='text-3xl'/>
              <p className="text-white text-lg font-bold">
                {name}
              </p>
            </li>

            <li className="text-white text-3xl font-bold cursor-pointer flex mx-2">
              {context.Notificaciones.length > 0 ? (
                <MdNotificationsActive onClick={() => { toast(); }} />
              ) : (
                <MdNotifications />
                )}
              <NavLink to="/Config" className="text-white text-3xl font-bold ml-1">
              <HiMiniCog6Tooth />
              </NavLink>
            </li>

            <li>
              <NavLink to="/" onClick={restore} className="text-white text-3xl font-bold">
                <HiOutlineLogout />
              </NavLink>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  ) : null;
};

export { Navbar };
