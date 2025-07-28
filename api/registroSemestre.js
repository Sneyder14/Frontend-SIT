const API_URL = "http://192.168.101.15:8000/api/semesters/";

export async function obtenerSemestre() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const semestre = await response.json();
        return semestre;
    } catch (error) {
        throw new Error('Error al obtener los Semestre: ' + error.message);
    }
}

export async function createSemestre(semestre) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(semestre),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newSemester = await response.json();
    return newSemester;
}
