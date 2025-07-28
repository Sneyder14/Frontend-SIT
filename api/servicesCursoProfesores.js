const API_URL = "http://192.168.101.15:8000/api/course-teachers/";

export async function obtenerCursoProfesores() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const cursoProfesor = await response.json();
        return cursoProfesor;
    } catch (error) {
        throw new Error('Error al obtener los curso-Profesor: ' + error.message);
    }
}

export async function createCursoProfesores(cursoProfesores) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursoProfesores),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newCursoProfesor = await response.json();
    return newCursoProfesor;
}