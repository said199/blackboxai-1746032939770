import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DriverRegistrationScreen from '../screens/DriverRegistrationScreen';
import DriverModeHome from '../screens/DriverModeHome';
// importa otras pantallas necesarias

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* otras pantallas */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DriverRegistration" component={DriverRegistrationScreen} options={{ title: 'Registro de Conductor' }} />
      <Stack.Screen name="DriverModeHome" component={DriverModeHome} options={{ title: 'Modo Conductor' }} />
    </Stack.Navigator>
  );
}
