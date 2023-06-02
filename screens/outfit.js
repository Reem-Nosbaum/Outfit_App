import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Outfit = ({ route }) => {
  const [outfitData, setOutfitData] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const { dest, image } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94'
        );
        const data = await response.json();
        const filteredData = data.filter(item => item.type === dest);
        setOutfitData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dest]);

  const handleSizeFilterChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorFilterChange = (color) => {
    setSelectedColor(color);
  };

  const filteredOutfitData = outfitData.filter(item => {
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

  const sizeOptions = dest === 'shirt' ? ['S', 'L', 'XL', 'XXL'] : [];
  const colorOptions = ['black', 'white', 'red', 'green', 'pink'];

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        {sizeOptions.length > 0 && (
          <View style={styles.filterButtonsContainer}>
            <Text>Size:</Text>
            {sizeOptions.map(size => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.filterButton,
                  selectedSize === size && styles.filterButtonSelected
                ]}
                onPress={() => handleSizeFilterChange(size)}
              >
                <Text style={styles.filterButtonText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.filterButtonsContainer}>
          <Text>Color:</Text>
          {colorOptions.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.filterButton,
                selectedColor === color && styles.filterButtonSelected
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
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={image} style={styles.itemImage} />
            <Text>Type: {item.type}</Text>
            <Text>Color: {item.color}</Text>
            <Text>Size: {item.size}</Text>
            <Text>Brand: {item.brand}</Text>
          </View>
        )}
      />
    </View>
  );
};

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

export default Outfit;
