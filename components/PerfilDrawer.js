
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {

    const user = {
        name: 'John Doe',
        role: 'Docente',
        image: 'https://media.istockphoto.com/id/2185236359/photo/mid-aged-man-comfortably-working-at-home-sitting-on-the-floor-with-his-beagle-dog-by-his-side.jpg?s=1024x1024&w=is&k=20&c=4CGVlTotOQLureX_m2A8fRiSvEimpomhP2NZBgpuFuA=',
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image source={{ uri: user.image }} style={styles.image} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.role}>{user.role}</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1E90FF',
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        color: '#fff',
        fontSize: 14,
        fontStyle: 'italic',
    },
});
