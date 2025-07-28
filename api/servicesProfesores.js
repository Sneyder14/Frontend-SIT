const API_URL = "http://192.168.101.15:8000/api/teachers/";

export async function obtenerProfesores() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const profesor = await response.json();
        return profesor;
    } catch (error) {
        throw new Error('Error al obtener los profesores: ' + error.message);
    }
}

export async function createProfesores(profesor) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profesor),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newProfesor = await response.json();
    return newProfesor;
}