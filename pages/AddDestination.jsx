import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDestination } from '../components/api';

export default function AddDestination({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleAddDestination = async () => {
    if (!name || !description || !difficulty) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    try {
      await addDestination({ name, description, difficulty });
      Alert.alert('Éxito', 'Destino agregado correctamente.');
      navigation.goBack(); 
    } catch (error) {
      console.error('Error al agregar destino:', error);
      Alert.alert('Error', 'No se pudo agregar el destino.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del destino"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción breve"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Dificultad (Fácil, Moderada, Difícil)"
        value={difficulty}
        onChangeText={setDifficulty}
      />
      <Button title="Agregar Destino" onPress={handleAddDestination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
