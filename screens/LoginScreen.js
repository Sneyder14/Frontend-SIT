import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import ModalMensaje from '../components/ModalComponente';
import { loginUsuario } from '../api/servicesUsuarios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContainerIcono from '../components/ContainerIcon';
import TituloHeader from '../components/TituloHeader';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMensaje, setModalMensaje] = useState({
    tipo: 'error',
    titulo: '',
    subtitulo: '',
  });

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setModalMensaje({
        tipo: 'error',
        titulo: 'Campos vacíos',
        subtitulo: 'Completa todos los campos para continuar.',
      });
      setModalVisible(true);
      return;
    }

    try {
      const { access } = await loginUsuario(email, password);

      await AsyncStorage.setItem('token', access);

      setModalMensaje({
        tipo: 'exito',
        titulo: '¡Bienvenido!',
        subtitulo: 'Inicio de sesión exitoso.',
      });
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.replace('Dashboard');

      }, 2000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setModalMensaje({
        tipo: 'error',
        titulo: 'Error de inicio de sesión',
        subtitulo:
          error?.response?.data?.detail || 'Correo o contraseña incorrectos.',
      });
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Icon name="account-circle" size={170} color='#3376ff' />


      <View style={styles.logoContainer}>
        <TituloHeader title='EI-SISTEM' fontSize={30} />
      </View>

      <View>
        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color="#3376ff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#3376ff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={20}
              color="#3376ff"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <CustomButton title="Iniciar Sesión" onPress={handleLogin} icon='login' />

        <View style={styles.linkContainer}>
          <Icon name="person-add" size={20} color="#1E90FF" />
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Registro')}
          >
            ¿No tienes cuenta? Regístrate aquí
          </Text>
        </View>
      </View>

      <ModalMensaje
        visible={modalVisible}
        tipo={modalMensaje.tipo}
        titulo={modalMensaje.titulo}
        subtitulo={modalMensaje.subtitulo}
        autoClose={true}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    gap: 15
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#3376ff',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Poppins_300Light'
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins_300Light'
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  link: {
    marginLeft: 5,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: 'Poppins_300Light'
  },
});
