import React, {useEffect, useState} from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';

export default function HolaMundo() {

  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const imageUrl = 'https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post1.jpg';

    Image.getSize(imageUrl, (width, height) => {
      console.log('Ancho:', width);
      console.log('Alto:', height);

      const screenWidth = Dimensions.get('window').width;
      const calculatedHeight = (screenWidth / width) * height;
      setImageHeight(calculatedHeight);

    }, (error) => {
      console.error('Error al obtener el tamaño de la imagen:', error);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>

      </View>
      <Image
        source={{ uri: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post1.jpg" }}
        style={{ width: '100%', height: imageHeight }}
        resizeMode="contain"
      />
    </View>
  );
}
