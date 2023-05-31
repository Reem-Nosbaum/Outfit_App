import React from 'react';
import { StyleSheet, View, Text,TouchableOpacity, Image, Alert} from 'react-native';
import { globalStyles } from '../styles/global';


export default function Home() {
  return (
    <View style={globalStyles.container}>
    <Text style={globalStyles.titleText}>Home Screen</Text>
    <Text style={globalStyles.titleText}>Pick a outfit</Text>
    <CustomButton title="Saved Outfits" onPress={handlePress} />
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

const handlePress = () => {
  Alert.alert('Button Pressed')}
  

const styles = StyleSheet.create({
  imageShirt: {
    width: 160,
    height: 200,
  },
  imagePants: {
    width: 220,
    height: 200,

  },
  imageShoes: {
    width: 150,
    height: 150,
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
    right: -30,
    top: 50,
    width: 50,
    height: 50,
    backgroundColor: '#7FFF00',
    borderRadius: 8,
    justifyContent: 'center',
    // alignItems: 'center',    

  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 1,
  },
});