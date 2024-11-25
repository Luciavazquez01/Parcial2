import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddDestination from './pages/AddDestination';
import EditDestination from './pages/EditDestination';
import DestinationList from './pages/DestinationList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DestinationList">
        <Stack.Screen
          name="DestinationList"
          component={DestinationList}
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
