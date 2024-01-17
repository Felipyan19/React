const END_POINT = import.meta.env.VITE_REACT_APP_BACKEND_URL;

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

export { variablesTemp };