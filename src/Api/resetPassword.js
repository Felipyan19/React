const END_POINT = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const handleResetPassword = async (email) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const data = new FormData();
    data.append('email', email);

    const response = await fetch(END_POINT + '/forgot-password', {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response?.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Hubo un error en la solicitud:', error.message);
    throw error; 
  }
};

export { handleResetPassword }