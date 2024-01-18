const END_POINT = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const handleLogin = async (email, password) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('device_name', 'app');

    const response = await fetch(`${END_POINT}/login`, {
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
const handleCampains = async (token) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", 'Bearer ' + token);

    const response = await fetch(END_POINT + '/clients', {
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
}
const handleUser = async (formFields) => {
  const { tokenUser: token, name, email, password } = formFields;
  try {

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + token);

    const requestBody = {
      name: name,
      email: email,
      password: password,
    };

    const response = await fetch(END_POINT + '/users', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(requestBody),
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
const handleClient = async (formFields) => {
    const { tokenUser: token, name, token_meta:tokenMeta, phone_id, waba_id, users, image} = formFields;

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + token);
    
    const formData = new FormData();
    formData.append('status', '1');
    formData.append('name', name);
    formData.append('token', tokenMeta);
    formData.append('phone_id', phone_id);
    formData.append('waba_id', waba_id);
    formData.append('users', users);
    formData.append('image', image, image.name);

    const response = await fetch(END_POINT + '/clients', {
      method: 'POST',
      headers: myHeaders,
      body: formData,
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
}

const handleGetTemplate = async (token, id) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/vnd.api+json");
    myHeaders.append('Authorization', 'Bearer ' + token);

    const response = await fetch(END_POINT + `/template/get-template/${id}`, {
      method: 'POST',
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
}
const handleSendTemplate = async (token, client, phone, template, image) => {

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + token);

    const formdata = new FormData();
    formdata.append("client", client);
    formdata.append("phone", phone);
    formdata.append("template", template);
    formdata.append("image", image);

    const response = await fetch(END_POINT + `/messages/send-template`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
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

}
const refreshTemplates = async (token, id) => {

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + token);


    const response = await fetch(END_POINT + `/template/update-template/${id}`, {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
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
}

const handleSendMensaje = async (token, client, phone, template) => {

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + token);

    const formdata = new FormData();
    formdata.append("client", client);
    formdata.append("phone", phone);
    formdata.append("template", template);

    const response = await fetch(END_POINT + `/messages/send-message`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
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
}

const handleTokenRefresh = async (token) => {

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + token);

    const response = await fetch(END_POINT + `/refresh-token`, {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
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
}

const handleSendEmail = async (token, total, error, complete, template) => {

  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append('Authorization', 'Bearer ' + token);

    const formdata = new FormData();
    formdata.append("total", total);
    formdata.append("error", error);
    formdata.append("complete", complete);
    formdata.append("template", template);

    const response = await fetch(END_POINT + `/send-notification`, {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
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
}

export {
  handleLogin,
  handleCampains,
  handleUser,
  handleClient,
  handleGetTemplate,
  handleSendTemplate,
  refreshTemplates,
  handleSendMensaje,
  handleTokenRefresh,
  handleSendEmail
};