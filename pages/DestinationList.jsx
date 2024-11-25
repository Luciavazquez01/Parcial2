import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';

const destinations = [
  { id: 1, name: 'Cataratas del Iguazú 🌊🌴', description: 'Impresionantes cascadas ubicadas en la frontera entre Argentina y Brasil.', difficulty: 'Fácil', favorites: 120 },
  { id: 2, name: 'Monte Everest 🗻❄️', description: 'La montaña más alta del mundo, ubicada en la cordillera del Himalaya.', difficulty: 'Difícil', favorites: 98 },
  { id: 3, name: 'Desierto del Sahara 🏜️☀️', description: 'El desierto cálido más grande del mundo, situado en África.', difficulty: 'Moderada', favorites: 85 },
  { id: 4, name: 'Gran Barrera de Coral 🐠🌊', description: 'El sistema de arrecifes de coral más grande del mundo, en Australia.', difficulty: 'Fácil', favorites: 150 },
  { id: 5, name: 'Machu Picchu 🏞️🦙', description: 'Una antigua ciudad inca situada en los Andes peruanos.', difficulty: 'Moderada', favorites: 134 },
  { id: 6, name: 'Parque Nacional Yellowstone 🐻🌲', description: 'El primer parque nacional del mundo, conocido por sus géiseres y fauna.', difficulty: 'Fácil', favorites: 112 },
  { id: 7, name: 'Islas Galápagos 🐢🌴', description: 'Un archipiélago volcánico famoso por su biodiversidad única.', difficulty: 'Moderada', favorites: 99 },
  { id: 8, name: 'Auroras Boreales en Noruega 🌌❄️', description: 'Un fenómeno natural espectacular visible en el cielo nocturno ártico.', difficulty: 'Fácil', favorites: 140 },
];

export default function DestinationList({ navigation }) {
  const [places, setPlaces] = useState(destinations);
  const [isSortedByFavorites, setIsSortedByFavorites] = useState(false);

  const handleRemove = (id) => {
    const updatedPlaces = places.filter(place => place.id !== id);
    setPlaces(updatedPlaces);
  };

  const handleFavoriteToggle = (id) => {
    const updatedPlaces = places.map(place =>
      place.id === id ? { ...place, favorites: place.favorites ? 0 : 1 } : place
    );
    setPlaces(updatedPlaces);
  };

  const toggleSortByFavorites = () => {
    setIsSortedByFavorites(!isSortedByFavorites);
    const sortedPlaces = [...places].sort((a, b) => b.favorites - a.favorites);
    setPlaces(sortedPlaces);
  };

  const renderPlace = ({ item }) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={styles.placeDescription}>{item.description}</Text>
      <Text style={[styles.difficultyTag, styles[item.difficulty.toLowerCase()]]}>{item.difficulty}</Text>
      <Text style={styles.favoriteCount}>Favoritos: {item.favorites}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditDestination', { id: item.id })} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>{item.favorites ? 'Desmarcar Favorito' : 'Marcar Favorito'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button title="Agregar Destino" onPress={() => navigation.navigate('AddDestination')} />
        <Button title="Ordenar por Favoritos" onPress={toggleSortByFavorites} color="green" />
      </View>
      <FlatList
        data={places}
        renderItem={renderPlace}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay destinos disponibles.</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  placeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeDescription: {
    fontSize: 14,
    color: '#555',
  },
  difficultyTag: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
  },
  easy: {
    backgroundColor: 'green',
  },
  moderate: {
    backgroundColor: 'yellow',
  },
  hard: {
    backgroundColor: 'red',
  },
  favoriteCount: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
