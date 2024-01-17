const END_POINT = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const theUsers = async ( token ) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const response = await fetch(`${END_POINT}/users`, {
      method: 'GET',
      headers: myHeaders,
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

export { theUsers };