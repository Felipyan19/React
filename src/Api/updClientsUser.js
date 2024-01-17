const END_POINT = 'https://pruebas.contactcentergrupo.com/api/public/api';
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
  
      const result = await response.json();
  
      return result;
  
    } catch (error) {
      console.log('Hubo un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  };

export { updClientsUser }