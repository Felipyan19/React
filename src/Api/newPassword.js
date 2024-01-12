const END_POINT = 'http://localhost:8000/api';
const handleNewPassword = async (token, password, password_confirmation, email) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const data = new FormData();
    data.append('token', token);
    data.append('password', password);
    data.append('password_confirmation', password_confirmation);
    data.append('email', email);

    
    const response = await fetch(`${END_POINT}/forgot-password/${token}`, {
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

export { handleNewPassword }