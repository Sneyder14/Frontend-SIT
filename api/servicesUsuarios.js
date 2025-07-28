const API_URL = "http://192.168.101.15:8000/api/users/";

export async function obtenerUsuarios() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message);
    }
}


export async function createUsuarios(estudiante) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newUsuario = await response.json();
    return newUsuario;
}