import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ContainerIcono({ iconName, iconColor, inSize = 170 }) {
    return (
        <View style={styles.container}>
            <Icon name={iconName} size={inSize} color={iconColor} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100, 
        backgroundColor: "#3376ff",
        padding: 20,
    },
});
