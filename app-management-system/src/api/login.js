import axios from "axios";

// Define la función que realizará la petición POST
async function enviarPeticion(url, datos) {
    try {
        const response = await axios.post(url, datos);
        console.log('Respuesta del servidor:', response.data);
        return response.data; // Devuelve los datos de respuesta si es necesario
    } catch (error) {
        console.error('Error al realizar la petición:', error);
        throw error; // Lanza el error para que pueda ser manejado externamente si es necesario
    }
}

const data = {
    username: 'usuario',
    password: 'contraseña'
};

const url = 'https://ejemplo.com/api/login';

enviarPeticion(url, data)
    .then(respuesta => {
        // 
    })
    .catch(error => {
        // 
    });
