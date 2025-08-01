import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function InputConIconos({
    iconName,
    placeholder,
    value,
    onChangeText,
    iconColor = '#000',
    containerStyle,
    inputStyle,
    type = 'text',
}) {
    const [secure, setSecure] = useState(type === 'password');

    return (
        <View style={[styles.inputContainer, containerStyle]}>
            <Icon name={iconName} size={22} color={iconColor} style={styles.icon} />
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                secureTextEntry={secure}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
            />
            {type === 'password' && (
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Icon
                        name={secure ? 'visibility-off' : 'visibility'}
                        size={22}
                        color="#999"
                        style={styles.eyeIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e7e7e7ff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
        marginVertical: 8,
        fontFamily: 'Poppins_300Light'
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins_300Light'
    },
    eyeIcon: {
        marginLeft: 8,
    },
});
