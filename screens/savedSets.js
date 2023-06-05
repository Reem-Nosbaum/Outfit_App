import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global';

export default function SavedSets() {
  const [savedSets, setSavedSets] = useState([]);

  useEffect(() => {
    retrieveSavedSets();
  }, []);

  const retrieveSavedSets = async () => {
    try {
      const savedSetsData = await AsyncStorage.getItem('savedSets');
      if (savedSetsData !== null) {
        const parsedSets = JSON.parse(savedSetsData);
        const completeSets = filterCompleteSets(parsedSets);
        setSavedSets(completeSets);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterCompleteSets = (sets) => {
    const completeSets = [];
    const setTypes = ['shirt', 'pants', 'shoes'];

    for (let i = 0; i < sets.length; i += 3) {
      const shirt = sets[i];
      const pants = sets[i + 1];
      const shoes = sets[i + 2];

      if (shirt && pants && shoes) {
        completeSets.push({ shirt, pants, shoes });
      }
    }

    return completeSets;
  };

  const deleteSavedSet = async (index) => {
    const updatedSavedSets = [...savedSets];
    updatedSavedSets.splice(index, 1);
    setSavedSets(updatedSavedSets);
    await AsyncStorage.setItem('savedSets', JSON.stringify(updatedSavedSets));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Saved Sets Screen</Text>
      <ScrollView style={styles.scrollView}>
        {savedSets.length > 0 ? (
          savedSets.map((set, index) => (
            <View key={index} style={styles.savedSetContainer}>
              <Text>Shirt:</Text>
              <Text>Brand: {set.shirt.brand}</Text>
              <Text>Color: {set.shirt.color}</Text>
              <Text>ID: {set.shirt.id}</Text>
              <Text>Size: {set.shirt.size}</Text>

              <Text>Pants:</Text>
              <Text>Brand: {set.pants.brand}</Text>
              <Text>Color: {set.pants.color}</Text>
              <Text>ID: {set.pants.id}</Text>
              <Text>Size: {set.pants.size}</Text>

              <Text>Shoes:</Text>
              <Text>Brand: {set.shoes.brand}</Text>
              <Text>Color: {set.shoes.color}</Text>
              <Text>ID: {set.shoes.id}</Text>
              <Text>Size: {set.shoes.size}</Text>

              <Button
                title="Delete"
                onPress={() => deleteSavedSet(index)}
                color="red"
              />
            </View>
          ))
        ) : (
          <Text>No saved sets found.</Text>
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  savedSetContainer: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
  },
});
