import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { fetchDestinations, updateDestination } from '../components/api';

export default function EditDestination({ route, navigation }) {
  const { id } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const loadDestination = async () => {
      try {
        const data = await fetchDestinations();
        const destination = data.find((item) => item.id === id);
        if (destination) {
          setName(destination.name);
          setDescription(destination.description);
          setDifficulty(destination.difficulty);
        }
      } catch (error) {
        console.error('Error al cargar destino:', error);
        Alert.alert('Error', 'No se pudo cargar el destino.');
      }
    };

    loadDestination();
  }, [id]);

  const handleUpdateDestination = async () => {
    if (!name || !description || !difficulty) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    try {
      await updateDestination(id, { name, description, difficulty });
      Alert.alert('Éxito', 'Destino actualizado correctamente.');
      navigation.goBack();  // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al actualizar destino:', error);
      Alert.alert('Error', 'No se pudo actualizar el destino.');
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
      <Button title="Actualizar Destino" onPress={handleUpdateDestination} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
