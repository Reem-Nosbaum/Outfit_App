import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('SavedSets');
  };

  const navaigateFunc = (destination, imagePath) => {
    navigation.navigate('Outfit', { dest: destination, image: imagePath });
    console.log(destination);
  };

  

  const dataImage = [
    {
      type: 'shirt',
      imagePath: require('../assets/shirt.png'),
      styleImagePath: 'imageShirt',
      functionClick: () => navaigateFunc('shirt', require('../assets/shirt.png')),
    },
    {
      type: 'pants',
      imagePath: require('../assets/pants.png'),
      styleImagePath: 'imagePants',
      functionClick: () => navaigateFunc('pants', require('../assets/pants.png')),
    },
    {
      type: 'shoes',
      imagePath: require('../assets/shoes.png'),
      styleImagePath: 'imageShoes',
      functionClick: () => navaigateFunc('shoes', require('../assets/shoes.png')),
    },
  ];
  
  const renderItemImage = ({ item }) => {
    const style = styles[item.styleImagePath];

    return (
      <View style={styles.imageStyle}>
        <TouchableOpacity onPress={item.functionClick}>
          <Image source={item.imagePath} style={style} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Pick an outfit</Text>
      <CustomButton title="Saved Outfits" onPress={pressHandler} />
      <FlatList data={dataImage} renderItem={renderItemImage} />
    </View>
  );
}

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    imageShirt: {
    width: 160,
    height: 200,
    flex: 1,
  },
  imagePants: {
    width: 220,
    height: 200,
    flex: 1,

  },
  imageShoes: {
    width: 160,
    height: 130,
    flex: 1,
  },

  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    flex: 1,
    margin: 3,
    padding: 2,
    borderColor: '#333',
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },

  button: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    backgroundColor: '#7FFF00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',    

  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 1,
  },
});