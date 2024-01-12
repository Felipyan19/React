const END_POINT = 'http://localhost:8000/api';
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

    const result = await response.json();

    return result;

  } catch (error) {
    console.log('Hubo un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
  }
};

export { newTokenClients }