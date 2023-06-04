import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';

export default function SavedSets({ route }) {
  const selectedItem = route.params?.selectedItem;

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Saved Sets Screen</Text>
      {selectedItem ? (
        <Text style={globalStyles.savedText}>{JSON.stringify(selectedItem)}</Text>
      ) : (
        <Text>No item selected.</Text>
      )}
    </View>
  );
}
