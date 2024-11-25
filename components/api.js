import fetch from "node-fetch";

export const fetchDestinations = async () => {
  try {
    console.log("Fetching destinations...");
    const response = await fetch("http://172.17.16.1/destinations");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener destinos: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    console.log("Destinations fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

export const deleteDestination = async (id) => {
  try {
    console.log(`Deleting destination with ID: ${id}`);
    const response = await fetch(`http://172.17.16.1/destinations/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al eliminar destino: ${response.status} - ${errorText}`);
    }
    console.log(`Destination with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting destination:", error);
    throw error;
  }
};

export const addDestination = async (destination) => {
  if (!destination.name || !destination.description || !destination.difficulty) {
    throw new Error("Faltan campos obligatorios: name, description o difficulty.");
  }

  try {
    console.log("Adding new destination:", destination);
    const response = await fetch("http://172.17.16.1/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(destination),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al agregar destino: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    console.log("Destination added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding destination:", error);
    throw error;
  }
};

export const updateDestination = async (id, updatedDestination) => {
  if (!updatedDestination.name || !updatedDestination.description || !updatedDestination.difficulty) {
    throw new Error("Faltan campos obligatorios: name, description o difficulty.");
  }

  try {
    console.log(`Updating destination with ID ${id}:`, updatedDestination);
    const response = await fetch(`http://172.17.16.1/destinations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedDestination),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar destino: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    console.log("Destination updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating destination:", error);
    throw error;
  }
};

export const toggleFavorite = async (id, isFavorite) => {
  try {
    console.log(`Toggling favorite for destination ID ${id} to ${isFavorite}`);
    const response = await fetch(`http://172.17.16.1/destinations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: isFavorite }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al actualizar favorito: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    console.log("Favorite status updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

export const fetchFavorites = async () => {
  try {
    console.log("Fetching favorite destinations...");
    const response = await fetch("http://172.17.16.1/destinations?favorite=true");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener favoritos: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    console.log("Favorite destinations fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};
