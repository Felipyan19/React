const END_POINT = 'https://pruebas.contactcentergrupo.com/api/public/api';

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

    const result = await response.json();

    return result;

  } catch (error) {
    console.error('Hubo un error en la solicitud. Por favor, inténtalo de nuevo más tarde.', error);
    throw error; 
  }
};

export { theUsers };