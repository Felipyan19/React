const END_POINT = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const newTokenClients = async (formFields) => {

  const { tokenUser:token, 'nuevo token':tokenMeta, Campaña } = formFields;

  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const data = new FormData();
    data.append("_method", "PUT");
    data.append('token', tokenMeta);

    const response = await fetch(`${END_POINT}/clients/${Campaña}`, {
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

export { newTokenClients }