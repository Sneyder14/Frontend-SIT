const API_URL = "http://192.168.101.15:8000/api/course-students/";

export async function obtenerCursoEstudiante() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const cursoSemestre = await response.json();
        return cursoSemestre;
    } catch (error) {
        throw new Error('Error al obtener los cursoSemestre: ' + error.message);
    }
}

export async function createCursoEstudiante(cursoEstudiante) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursoEstudiante),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newCursoEstudiante = await response.json();
    return newCursoEstudiante ;
}