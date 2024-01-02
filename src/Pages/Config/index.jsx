import { useContext } from 'react';
import { MasivosContext } from '../../Context/index.jsx';
import { Layout } from '../../Components/Layout';
import { IoListCircle } from "react-icons/io5";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { FaUsersCog } from "react-icons/fa";
import Swal from 'sweetalert2';
import './styles.css';

const Form = async (tokenUser, title, mode, fields, api) => {

  const inputHTML = fields
    .map((field, index) => {
      if (field === 'image') {
        return `<input id="swal-input${index + 1}" class="swal2-input" placeholder="${field}" type="file">`;
      } else {
        const inputID = `swal-input${index + 1}`;
        return `<input id="${inputID}" class="swal2-input" placeholder="${field}">`;
      }
    }).join('');

  const titleHtml = `<h3 class="swal2-title">${title}</h3>`;

  const { value: formValues } = await Swal.fire({
    title: titleHtml,
    html: inputHTML,
    focusConfirm: false,
    preConfirm: () => {
      return fields.map((field, index) => {
        const inputID = `swal-input${index + 1}`;
        if (field === 'image') {
          return document.getElementById(inputID).files[0];
        } else {
          return document.getElementById(inputID).value;
        }
      });
    },
  });

  if (formValues) {
    const response = await api(tokenUser, formValues);
    if (!response.errors) {
      Swal.fire({
        icon: 'success',
        html: `<h1>Id: ${response.id} - ${response.type} registrado con éxito</h1>`
      });
    } else {
      Swal.fire({
        icon: 'error',
        html: `<h1>No fue posible realizar el registro</h1>`
      });
    }
  }
};


const Box = ({ title, emoji }) => {
  const context = useContext(MasivosContext);
  return (
    <div className='mx-5 items-center justify-between flex flex-col rounded-lg shadow-xl border bg-white w-72 h-80'>
      <h2 className='text-6xl mt-10 text-[#0096C8]'>{emoji}</h2>
      <h1 className='text-2xl text-[#0096C8]'>{title}</h1>
      <button
        className='bg-[#0096C8] text-white w-4/6 h-8 rounded transition-colors duration-200 mb-8'
        onClick={() => Form(
          context.tokenUser,
          title,
          'Crear',
          context.fieldsFormConfig[title]['Crear']['fields'],
          context.fieldsFormConfig[title]['Crear']['api']
        )
        }>
        Crear
      </button>
    </div>
  );
}

const Config = () => {
  return (
    <Layout title='Configuracion'>
      <div className="flex justify-center items-center">
        <Box title='Usuarios' emoji={<IoPeopleCircleSharp />} />
        <Box title='Campañas' emoji={<IoListCircle />} />
        <Box title='Usuarios por campañas' emoji={<FaUsersCog />} />
      </div>
    </Layout>
  );
}

export { Config };
