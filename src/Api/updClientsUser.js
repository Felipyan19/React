const END_POINT = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const updClientsUser = async (formFields) => {

    const { tokenUser:token, Campaña, users } = formFields;
  
    try {
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', 'Bearer ' + token);
  
      const data = new FormData();
      
      data.append("users[0]", users[0]);
  
      const response = await fetch(`${END_POINT}/clients/${Campaña}/update-users`, {
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

export { updClientsUser }