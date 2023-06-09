import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Outfit({ route, navigation }) {
  const [outfitData, setOutfitData] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [image, setImage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  // Function called when an outfit item is pressed
  const handleItemPress = (item) => {
    const selectedItem = {
      brand: item.brand,
      color: item.color,
      id: item.id,
      size: item.size,
      type: item.type,
    };

    AsyncStorage.getItem('savedSets')
      .then((savedSetsData) => {
        const savedSets = savedSetsData ? JSON.parse(savedSetsData) : [];
        savedSets.push(selectedItem);
        AsyncStorage.setItem('savedSets', JSON.stringify(savedSets));
      })
      .catch((error) => {
        console.error(error);
      });

    navigation.navigate('Outfit', { dest: nextPage });
  };

  const { dest } = route.params;

  useEffect(() => {
    // Set the image and next page based on the destination received from the route params
    switch (route.params.dest) {
      case 'shirt':
        setImage(require('../assets/shirt.png'));
        setNextPage('pants');
        break;
      case 'pants':
        setImage(require('../assets/pants.png'));
        setNextPage('shoes');
        break;
      case 'shoes':
        setImage(require('../assets/shoes.png'));
        setNextPage('shirt');
        break;
      default:
        break;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94'
        );
        const data = await response.json();
        const filteredData = data.filter((item) => item.type === dest);
        setOutfitData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dest]);

  // Function called when the size filter changes
  const handleSizeFilterChange = (size) => {
    setSelectedSize(size);
  };

  // Function called when the color filter changes
  const handleColorFilterChange = (color) => {
    setSelectedColor(color);
  };

  // Filter the outfit data based on the selected size and color
  const filteredOutfitData = outfitData.filter((item) => {
    let isSizeMatched = true;
    let isColorMatched = true;

    if (selectedSize && item.size !== selectedSize) {
      isSizeMatched = false;
    }
    if (selectedColor && item.color !== selectedColor) {
      isColorMatched = false;
    }

    return isSizeMatched && isColorMatched;
  });

  // Determine the size options based on the destination
  const sizeOptions =
    dest === 'shirt'
      ? ['S', 'L', 'XL', 'XXL']
      : dest === 'pants'
      ? Array.from({ length: 19 }, (_, index) => Number(index + 30))
      : dest === 'shoes'
      ? Array.from({ length: 11 }, (_, index) => Number(index + 36))
      : [];

  const colorOptions = ['black', 'white', 'red', 'green', 'pink'];

  return (
    <View style={globalStyles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        {sizeOptions.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterButtonsContainer}>
              <Text>Size:</Text>
              {sizeOptions.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.filterButton,
                    selectedSize === size && styles.filterButtonSelected,
                  ]}
                  onPress={() => handleSizeFilterChange(size)}
                >
                  <Text style={styles.filterButtonText}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
        <View style={styles.filterButtonsContainer}>
          <Text>Color:</Text>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.filterButton,
                selectedColor === color && styles.filterButtonSelected,
              ]}
              onPress={() => handleColorFilterChange(color)}
            >
              <Text style={styles.filterButtonText}>{color}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
        data={filteredOutfitData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <Image source={image} style={styles.itemImage} />
            </TouchableOpacity>
            <Text>Type: {item.type}</Text>
            <Text>Color: {item.color}</Text>
            <Text>Size: {item.size}</Text>
            <Text>Brand: {item.brand}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  filterLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  filterButton: {
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  filterButtonSelected: {
    backgroundColor: '#333',
  },
  filterButtonText: {
    color: 'white',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
});
