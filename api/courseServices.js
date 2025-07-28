const API_URL = "http://192.168.101.15:8000/api/courses/";

export async function obtenerCursos() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const cursos = await response.json();
    return cursos;
  } catch (error) {
    throw new Error('Error al obtener los cursos: ' + error.message);
  }
}

export async function createCourse(course) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }

  const newCourse = await response.json();
  return newCourse;
}
