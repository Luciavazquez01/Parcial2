import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { fetchDestinations, deleteDestination, toggleFavorite } from '../components/api';

export default function Destinations({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [isSortedByFavorites, setIsSortedByFavorites] = useState(false);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setPlaces(data);
      } catch (error) {
        console.error('Error al cargar destinos:', error);
        alert('No se pudieron cargar los destinos.');
      }
    };
    loadDestinations();
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteDestination(id);
      setPlaces(places.filter(place => place.id !== id));
    } catch (error) {
      console.error('Error al eliminar destino:', error);
      alert('No se pudo eliminar el destino.');
    }
  };

  const handleFavoriteToggle = async (id, isFavorite) => {
    try {
      await toggleFavorite(id, !isFavorite);
      setPlaces(places.map(place =>
        place.id === id ? { ...place, favorites: !place.favorites } : place
      ));
    } catch (error) {
      console.error('Error al cambiar favorito:', error);
      alert('No se pudo cambiar el estado de favorito.');
    }
  };

  const toggleSortByFavorites = () => {
    setIsSortedByFavorites(!isSortedByFavorites);
    const sortedPlaces = [...places].sort((a, b) =>
      isSortedByFavorites ? a.favorites - b.favorites : b.favorites - a.favorites
    );
    setPlaces(sortedPlaces);
  };

  const renderPlace = ({ item }) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.name}</Text>
      <Text style={[styles.difficultyTag, styles[item.difficulty.toLowerCase()]]}>
        {item.difficulty}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('EditDestination', { id: item.id })}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleRemove(item.id)}
        >
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleFavoriteToggle(item.id, item.favorites)}
        >
          <Text style={styles.actionButtonText}>
            {item.favorites ? 'Desmarcar Favorito' : 'Marcar Favorito'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button
          title="Agregar Destino"
          onPress={() => navigation.navigate('AddDestination')}
        />
        <Button
          title="Ordenar por Favoritos"
          onPress={toggleSortByFavorites}
          color="green"
        />
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
