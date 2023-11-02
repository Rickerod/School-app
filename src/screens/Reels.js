import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SingleReel from '../components/SingleReel';

export default function Reels({route}) {
  const {uri_image} = route.params
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 0,
        }}>
        <SingleReel uri_image={uri_image} />
      </View>
    </View>
  );
}
