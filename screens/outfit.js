import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Outfit = ({ route }) => {
  const [outfitData, setOutfitData] = useState([]);
  const [filter, setFilter] = useState('');

  const { dest } = route.params;

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

  const handleFilterChange = value => {
    setFilter(value);
  };

  const filteredOutfitData = outfitData.filter(item =>
    item.color.toLowerCase().includes(filter.toLowerCase())
  );

  

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('black')}
        >
          <Text style={styles.filterButtonText}>Black</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('white')}
        >
          <Text style={styles.filterButtonText}>white</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('red')}
        >
        <Text style={styles.filterButtonText}>red</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('pink')}
        >
        <Text style={styles.filterButtonText}>pink</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => handleFilterChange('green')}
        >
        <Text style={styles.filterButtonText}>green</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredOutfitData}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={require('../assets/shirt.png')} style={styles.itemImage} />
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
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterLabel: {
    marginRight: 8,
  },
  filterButton: {
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
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