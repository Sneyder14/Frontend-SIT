import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import InputConIconos from "../components/InputConIconos";
import TituloHeader from "../components/TituloHeader";
import CustomButton from "../components/CustomButton";
import ContainerIcon from "../components/ContainerIcon";

export default function LoginAdmin({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>

            <ContainerIcon iconName='person'
                iconColor='#fff' />
            <View>
                <TituloHeader title='Bienvenido Administrador/a' />
            </View>

            <View style={styles.inputs}>
                <InputConIconos
                    iconName="person"
                    placeholder="Usuario"
                    iconColor="#3376ff"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <InputConIconos
                    iconName="lock"
                    iconColor="#3376ff"
                    placeholder="Contraseña"
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <CustomButton title='Entrar'
                icon='login' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        gap: 15,
        backgroundColor: '#fff'
    },
    inputs: {
        width: '100%'
    }
});
