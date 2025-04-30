const API_URL = 'https://www.fletgohn.com/backend';

export const loginUser = async (phone) => {
  try {
    const response = await fetch(`${API_URL}/api/autenticacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phone
      })
    });

    const data = await response.json();
    
    if (data.success) {
      return {
        estado: true,
        correo: data.data.correo,
        nombre: data.data.nombre
      };
    } else {
      return {
        estado: false,
        descripcion: data.menssage || 'Error al iniciar sesión'
      };
    }
  } catch (error) {
    console.error('Error en login:', error);
    return {
      estado: false,
      descripcion: 'Error de conexión. Por favor, intente nuevamente.'
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/registrar_usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        fullName: userData.fullName,
        phone: userData.phone,
        identity: userData.identity
      })
    });

    const data = await response.json();
    return data[0]; // La API devuelve un array con un solo objeto de respuesta
  } catch (error) {
    console.error('Error en registro:', error);
    return {
      codigo: -1,
      descripcion: 'Error de conexión. Por favor, intente nuevamente.',
      estado: false
    };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/actualizar_perfil`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return false;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch(`${API_URL}/api/activar_otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: email,
        otp: parseInt(otp.join(''), 10)
      })
    });

    const success = await response.json();
    return success;
  } catch (error) {
    console.error('Error en verificación:', error);
    return false;
  }
};
