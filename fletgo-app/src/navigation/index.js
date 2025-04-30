import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DriverRegistrationScreen from '../screens/DriverRegistrationScreen';
// importa otras pantallas necesarias

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* otras pantallas */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DriverRegistration" component={DriverRegistrationScreen} options={{ title: 'Registro de Conductor' }} />
    </Stack.Navigator>
  );
}
