const API_URL = "http://192.168.101.15:8000/api/students/";

export async function obtenerEstudiantes() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const estudiantes = await response.json();
        return estudiantes;
    } catch (error) {
        throw new Error('Error al obtener los estudiantes: ' + error.message);
    }
}


export async function createEstudiantes(estudiante) {
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

    const newEstudiante = await response.json();
    return newEstudiante;
}