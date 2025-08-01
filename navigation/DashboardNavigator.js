import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, TouchableOpacity } from 'react-native';
import CustomDrawerContent from "../components/PerfilDrawer"
import DashboardScreen from '../screens/DashboardScreen';
import StudentsScreen from '../screens/StudentsScreen';
import InterventionsScreen from '../screens/InterventionsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TutoringScheduleScreen from '../screens/TutoringScheduleScreen';
import RegistrarCyS from '../screens/RegistrarCyS';
import VerRegistrosScreen from '../screens/VerRegistrosScreen';

const Drawer = createDrawerNavigator();

// Componente personalizado para el título del header
function CustomHeaderTitle({ title }) {
  return (
    <Text
      style={{
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase',
      }}
    >
      {title}
    </Text>
  );
}

// Ícono personalizado a la izquierda del header
function CustomHeaderLeft() {
  return (
    <TouchableOpacity onPress={() => { }} style={{ marginLeft: 15 }}>
      <Ionicons name="school-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

export default function DashboardNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerStyle: {
          backgroundColor: '#f9f9f9',
          width: 250,
          paddingTop: 20,
        },
        drawerActiveTintColor: '#1E90FF',
        drawerInactiveTintColor: '#666',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E90FF',
        },
        headerTitleAlign: 'center',
        headerTitle: () => <CustomHeaderTitle title={route.name} />,
        headerLeft: () => <CustomHeaderLeft />,
        drawerActiveBackgroundColor: '#e4e4e4ff',
        drawerAllowFontScaling: true,
        drawerHideStatusBarOnOpen: true,
        drawerPosition: 'right',
        drawerStatusBarAnimation: 'slide',
        drawerType: 'front',
        drawerContentStyle: {
          fontFamily: 'Poppins_400Regular',
        },
      })}
    >
      {/* Tus pantallas aquí */}
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Students"
        component={StudentsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Interventions"
        component={InterventionsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tutoring"
        component={TutoringScheduleScreen}
        options={{
          title: 'Tutorías',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Registrar"
        component={RegistrarCyS}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Registros"
        component={VerRegistrosScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="eye-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
