import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import originalPets from '../data/pets';
import PetItem from "./PetItem";

const PetList = () => {
  const [pets, setPets] = useState(originalPets);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  
  const handleAdopt = (id: number) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
  };

  const filteredPets = pets
    .filter((pet) =>
      type === 'All' ? true : pet.type === type
    )
    .filter((pet) =>
      pet.name.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput 
        placeholder="Search for a pet" 
        style={styles.searchInput}
        value={query}
        onChangeText={(text) => setQuery(text)}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setType('All')}>
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={() => setType('Cat')}>
          <Text>Cat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={() => setType('Dog')}>
          <Text>Dog</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={() => setType('Rabbit')}>
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {filteredPets.map((pet) => (
        <PetItem key={pet.id} pet={pet} onAdopt={() => handleAdopt(pet.id)} />
      ))}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
