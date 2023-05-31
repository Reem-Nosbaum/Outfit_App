import React from 'react';
import { StyleSheet, View, Text,TouchableOpacity, Image, Alert} from 'react-native';
import { globalStyles } from '../styles/global';


export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.navigate('SavedSets');
  }

  return (
    <View style={globalStyles.container}>
    <Text style={globalStyles.titleText}>Pick a outfit</Text>
    <CustomButton title="Saved Outfits" onPress={pressHandler} />
    <View style={styles.imageStyle}>
      <Image source={require('../assets/shirt.png')} style={styles.imageShirt} />
    </View>
    <View style={styles.imageStyle}>
      <Image source={require('../assets/pants.png')} style={styles.imagePants} />
    </View>
    <View style={styles.imageStyle}>
      <Image source={require('../assets/shoes.png')} style={styles.imageShoes} />
    </View>
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
    width: 165,
    height: 130,
    // flex: 1,
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