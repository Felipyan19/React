const END_POINT = 'https://pruebas.contactcentergrupo.com/api/public/api';

const variablesTemp = async (token, client, phone, template, parameter, image) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const data = new FormData();
    data.append("client", client);
    data.append("phone", phone);
    data.append("template", template);

    parameter.forEach((param, index) => {
      data.append(`parameter[${index}]`, param);
    });

    data.append("image", image);

    const response = await fetch(`${END_POINT}/messages/send-template-parameter`, {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    });

    const result = await response.json();

    return result;

  } catch (error) {
    console.error('Hubo un error en la solicitud. Por favor, inténtalo de nuevo más tarde.', error);
    throw error; 
  }
};

export { variablesTemp };