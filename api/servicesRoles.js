const API_URL = "http://192.168.101.15:8000/api/roles/";

export async function obtenerRoles() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const roles = await response.json();
        return roles;
    } catch (error) {
        throw new Error('Error al obtener los roles: ' + error.message);
    }
}


export async function createRoles(rol) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rol),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newRol = await response.json();
    return newRol;
}