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
        nombre: data.data.nombre,
        id:data.data.id
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
export const getUserPersonalInfo = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/Informacion/datospersonales/${userId}`);
    const data = await response.json();
    console.log('📥 Datos recibidos del backend:', data);

    if (data.sucess && data.data && data.data.length > 0) {
      const userData = data.data[0];

      let fechaNacimiento = '';
      if (userData.datosPersonales) {
        const fechas = JSON.parse(userData.datosPersonales);
        if (Array.isArray(fechas) && fechas.length > 0) {
          const ultimaFecha = fechas[fechas.length - 1].FechaNacimiento;
          fechaNacimiento = ultimaFecha;
        }
      }

      return {
        estado: true,
        nombre: userData.Nombre || '',
        correo: userData.Correo || '',
        fechaNacimiento,
      };
    } else {
      return {
        estado: false,
        descripcion: 'No se encontraron datos.'
      };
    }
  } catch (error) {
    console.error('Error al obtener datos personales:', error);
    return {
      estado: false,
      descripcion: 'Error de conexión. Intente nuevamente.'
    };
  }
};

export const saveUserPersonalInfo = async (userId, fullName, birthDate, email) => {
  try {
    const response = await fetch(`${API_URL}/api/Datos_Personales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refusuario: parseInt(userId, 10),
        Nombre: fullName,
        fechanacimiento: birthDate,
        correo: email,
        foto: null,
      }),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error al guardar información personal:', error);
    return null;
  }
};
export const actualizarDatosPersonales = async (userId, nombre, correo, fechaNacimiento, imagenUri = null) => {
  const formData = new FormData();

  formData.append('id', userId);
  formData.append('nombre', nombre);
  formData.append('correo', correo);
  formData.append('fechanacimiento', fechaNacimiento);

  if (imagenUri) {
    const fileName = imagenUri.split('/').pop();
    const fileType = fileName.split('.').pop();

    formData.append('foto', {
      uri: imagenUri,
      name: fileName,
      type: `image/${fileType}`,
    });
  }

  try {
    const response = await fetch('https://www.fletgohn.com/backend/api/datospersonales/actualizar', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al actualizar datos personales:', error);
    return { success: false, message: 'Error de conexión' };
  }
};
