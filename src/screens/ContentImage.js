import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SingleContentImage from '../components/SingleContentImage';

export default function ContentImage({route}) {
  const {uri_image} = route.params
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
        <SingleContentImage uri_image={uri_image} />
    </View>
  );
}
