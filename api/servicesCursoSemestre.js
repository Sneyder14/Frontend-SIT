const API_URL = "http://192.168.101.15:8000/api/course-semesters/";

export async function obtenerCursoSemestres() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const cursoSemestre = await response.json();
        return cursoSemestre;
    } catch (error) {
        throw new Error('Error al obtener los curso-Semestre: ' + error.message);
    }
}

export async function createCursoSemestre(cursoSemestre) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cursoSemestre),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newCursoSemestre = await response.json();
    return newCursoSemestre ;
}