import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Destinations from './pages/Destinations';
import AddDestination from './pages/AddDestination';
import EditDestination from './pages/EditDestination';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Destinations">
        <Stack.Screen
          name="Destinations"
          component={Destinations}
          options={{ title: 'Lista de Destinos' }}
        />
        <Stack.Screen
          name="AddDestination"
          component={AddDestination}
          options={{ title: 'Agregar Destino' }}
        />
        <Stack.Screen
          name="EditDestination"
          component={EditDestination}
          options={{ title: 'Editar Destino' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
