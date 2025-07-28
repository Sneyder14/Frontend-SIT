import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import TablaComponente from "../components/TablaComponente";
import { obtenerEstudiantes } from "../api/servicesEstudiantes";
import { obtenerProfesores } from "../api/servicesProfesores";
import { obtenerCursos } from "../api/courseServices";
import { obtenerSemestre } from "../api/registroSemestre";
import { obtenerCursoProfesores } from "../api/servicesCursoProfesores";
import { obtenerCursoEstudiante } from "../api/servicesCursoEstudiantes";
import { obtenerCursoSemestres } from "../api/servicesCursoSemestre";
import { obtenerUsuarios } from "../api/servicesUsuarios";
import { obtenerRoles } from "../api/servicesRoles";

const opciones = [
    { label: 'Estudiantes', value: 'estudiantes' },
    { label: 'Profesores', value: 'profesores' },
    { label: 'Cursos', value: 'cursos' },
    { label: 'Semestres', value: 'semestres' },
    { label: 'Curso-Profesores', value: 'curso_profesores' },
    { label: 'Curso-Estudiantes', value: 'curso_estudiantes' },
    { label: 'Curso-Semestres', value: 'curso_semestres' },
    { label: 'Roles', value: 'roles' },
    { label: 'Usuarios', value: 'users' }
];

export default function VerRegistrosScreen({ navigation }) {
    const [selectedTable, setSelectedTable] = useState('estudiantes');
    const [datos, setDatos] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    //para actualizar Put
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const tablasConPut = ['estudiantes', 'profesores', 'cursos', 'semestres', 'users'];


    const handleRowPress = (registro) => {
        if (!tablasConPut.includes(selectedTable)) return;
        setRegistroSeleccionado(registro);
        setModalVisible(true);
    };


    //Mostrar Los Datos Get
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                let data = [];

                switch (selectedTable) {
                    case 'estudiantes':
                        data = await obtenerEstudiantes();
                        setHeaders(['id_student', 'name', 'last_name', 'email', 'status']);
                        break;
                    case 'profesores':
                        data = await obtenerProfesores();
                        setHeaders(['id_teacher', 'name', 'last_name',]);
                        break;
                    case 'cursos':
                        data = await obtenerCursos();
                        setHeaders(['id_course', 'name_course', 'acronim', 'status']);
                        break;
                    case 'semestres':
                        data = await obtenerSemestre();
                        setHeaders(['id_semester', 'semester', 'status']);
                        break;
                    case 'curso_profesores':
                        data = await obtenerCursoProfesores();
                        setHeaders(['assignment_date', 'status', 'id_course', 'id_teacher']);
                        break;
                    case 'curso_estudiantes':
                        data = await obtenerCursoEstudiante();
                        setHeaders(['enrollment_date', 'status', 'id_course', 'id_student']);
                        break;
                    case 'curso_semestres':
                        data = await obtenerCursoSemestres();
                        setHeaders(['start_date', 'end_date', 'status', 'id_course', 'id_semester']);
                        break;
                    case 'users':
                        data = await obtenerUsuarios();
                        setHeaders(['id_user', 'name', 'last_name', 'email', 'status', 'id_role']);
                        break;
                    case 'roles':
                        data = await obtenerRoles();
                        setHeaders(['id_role', 'name_role', 'status']);
                        break;
                }

                setDatos(data);
            } catch (error) {
                console.error("Error al cargar datos:", error.message);
            }
        };

        cargarDatos();
    }, [selectedTable]);

    const datosFiltrados = datos.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(busqueda.toLowerCase())
        )
    );

    //Actulizar Put
    const handleGuardarCambios = async () => {
        try {
            let endpoint = '';
            let idKey = '';

            switch (selectedTable) {
                case 'estudiantes':
                    endpoint = 'http://192.168.101.15:8000/api/students/';
                    idKey = 'id_student';
                    break;
                case 'profesores':
                    endpoint = 'http://192.168.101.15:8000/api/teachers/';
                    idKey = 'id_teacher';
                    break;
                case 'cursos':
                    endpoint = 'http://192.168.101.15:8000/api/courses/';
                    idKey = 'id_course';
                    break;
                case 'semestres':
                    endpoint = 'http://192.168.101.15:8000/api/semesters/';
                    idKey = 'id_semester';
                    break;
                case 'users':
                    endpoint = 'http://192.168.101.15:8000/api/users/';
                    idKey = 'id_user';
                    break;
            }

            const response = await fetch(`${endpoint}${registroSeleccionado[idKey]}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registroSeleccionado)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar');
            }

            const dataActualizada = await response.json();
            setModalVisible(false);
            setRegistroSeleccionado(null);

            // Recarga los datos
            setDatos((prev) =>
                prev.map((item) =>
                    item[idKey] === dataActualizada[idKey] ? dataActualizada : item
                )
            );
        } catch (error) {
            console.error('Error en PUT:', error.message);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.containeScroll}>
                    {/* Tabs modernos */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
                        {opciones.map((opcion) => (
                            <TouchableOpacity
                                key={opcion.value}
                                onPress={() => setSelectedTable(opcion.value)}
                                style={[
                                    styles.tabButton,
                                    selectedTable === opcion.value && styles.tabButtonActive
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.tabButtonText,
                                        selectedTable === opcion.value && styles.tabButtonTextActive
                                    ]}
                                >
                                    {opcion.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Búsqueda */}
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar por cualquier campo..."
                        value={busqueda}
                        onChangeText={setBusqueda}
                    />

                    {/* Tabla */}
                    <TablaComponente headers={headers} data={datosFiltrados} onRowPress={handleRowPress} />
                </ScrollView>
            </View>

            {/* Modal*/}
            {modalVisible && registroSeleccionado && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>✏️ Editar Registro</Text>

                        {headers.map((campo, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                value={registroSeleccionado[campo]?.toString() || ''}
                                onChangeText={(texto) =>
                                    setRegistroSeleccionado({ ...registroSeleccionado, [campo]: texto })
                                }
                                placeholder={campo}
                            />
                        ))}

                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={handleGuardarCambios} style={styles.saveButton}>
                                <Text style={styles.buttonText}>💾 Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>❌ Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 7,
        paddingTop: 10,
        paddingHorizontal: 6,
        backgroundColor: '#fff'
    },
    containeScroll: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 5,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        marginRight: 8,
    },
    tabButtonActive: {
        backgroundColor: '#4A90E2',
    },
    tabButtonText: {
        fontSize: 14,
        color: '#333',
    },
    tabButtonTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
