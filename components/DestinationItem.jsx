import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default function DestinationItem({ name, difficulty, onDelete, onFavorite, isFavorite }) {
  const getTagColor = () => {
    switch (difficulty) {
      case 'Fácil':
        return styles.easyTag;
      case 'Moderada':
        return styles.moderateTag;
      case 'Difícil':
        return styles.hardTag;
      default:
        return styles.defaultTag;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      
      <Text style={[styles.tag, getTagColor()]}>{difficulty}</Text>
      <View style={styles.actions}>
    
        <TouchableOpacity
          onPress={onFavorite}
          style={[styles.favoriteButton, isFavorite && styles.activeFavoriteButton]}
          accessibilityLabel="Marcar como favorito"
          accessibilityRole="button"
        >
          <Text>{isFavorite ? '💖' : '⭐'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          accessibilityLabel="Eliminar destino"
          accessibilityRole="button"
        >
          <Text>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

DestinationItem.propTypes = {
  name: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool,
};

DestinationItem.defaultProps = {
  isFavorite: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  easyTag: {
    backgroundColor: '#28a745', 
  },
  moderateTag: {
    backgroundColor: '#ffc107', 
  },
  hardTag: {
    backgroundColor: '#6f42c1', 
  },
  defaultTag: {
    backgroundColor: '#ccc',
  },
  actions: {
    flexDirection: 'row',
  },
  favoriteButton: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
  },
  activeFavoriteButton: {
    backgroundColor: '#ff69b4', 
  },
  deleteButton: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
  },
});
