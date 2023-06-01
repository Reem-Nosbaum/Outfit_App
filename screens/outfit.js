import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Outfit = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94');
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {dataList.map((item, index) => (
        <Text key={index}>
          {item.id} - {item.type} - {item.color} - {item.size} - {item.brand}
        </Text>
      ))}
    </View>
  );
};

export default Outfit;