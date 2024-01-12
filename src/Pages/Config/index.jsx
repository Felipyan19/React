import { useContext, useEffect, useState } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { Layout } from '../../Components/Layout';
import { IoListCircle } from "react-icons/io5";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import { theUsers } from '../../Api/theUsers';
import { FormConfig } from '../../Components/FormConfig';
import './styles.css';

const Box = ({ title, emoji }) => {
  const context = useContext(MasivosContext);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setShowForm(true);
  };

  const closeToast = () => {
    setShowForm(false);
  }

  const nameButton = () => {
    return title === 'Usuarios' || title === 'Campañas' ? 'Crear' : 'Modificar';
  };

  return (
    <>
      <div className='mx-5 mb-6 items-center justify-between flex flex-col rounded-lg shadow-xl border bg-white w-72 h-80'>
        <h2 className='text-6xl mt-10 text-[#0096C8]'>{emoji}</h2>
        <h1 className='text-2xl text-[#0096C8]'>{title}</h1>
        <button
          className='bg-[#0096C8] text-white w-4/6 h-8 rounded transition-colors duration-200 mb-8'
          onClick={handleCreate}
        >
          {nameButton()}
        </button>
      </div>
      {showForm && (
        <FormConfig
          tokenUser={context.tokenUser}
          title={title}
          mode='Crear'
          fields={context.fieldsFormConfig[title]?.Crear?.fields}
          api={context.fieldsFormConfig[title]?.Crear?.api}
          closeToast={closeToast}
        />
      )}
    </>
  );
};


const Config = () => {
  const context = useContext(MasivosContext);
useEffect(() => {
  theUsers(context.tokenUser)
  .then(result => {
      context.setGetDataUsers(result.data);
  });
}, []);
  return (
    <Layout title='Configuracion'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
        <Box title='Usuarios' emoji={<IoPeopleCircleSharp />} />
        <Box title='Campañas' emoji={<IoListCircle />} />
        <Box title={'Cambiar token'} emoji={<IoPeopleCircleSharp />} />
        <Box title={'Usuario por Campaña'} emoji={<FaUsersCog />} />
      </div>
    </Layout>
  );
};

export { Config };