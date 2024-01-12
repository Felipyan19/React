import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MasivosContext } from '../../Context';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { HiMiniCog6Tooth } from "react-icons/hi2";
import { MdNotifications } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { MyNotification } from '../MyNotification';
import { useNabvar } from './useNabvar';
import Logoh from '../../assets/logo-header.png';

/**
 * Creates a Navbar component.
 *
 * @return {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {

  const context = useContext(MasivosContext);
  const { name, isScrolled, toast, restore } = useNabvar();
  
  return context.login ? (
    <>
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
              <FaUserCircle className='text-3xl' />
              <p className="text-white text-lg font-bold">
                {name}
              </p>
            </li>

            <li className="text-white text-3xl font-bold cursor-pointer flex mx-2">
              {context.newNotifications ? (
                <div className='relative'> 
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  <MdNotificationsActive onClick={() => { toast(); }} />
                </div>
              ) : (
                  <MdNotifications onClick={() => { toast(); }} />
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
      <MyNotification />
      </>
  ) : null;
};

export { Navbar };
