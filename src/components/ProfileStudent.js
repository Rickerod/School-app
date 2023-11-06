import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileStudent({route}) {
  
  return (
    <View style={styles.container}>
      <Text style={{paddingBottom: 20, fontSize: 17}}> {route.params.name}</Text>
      <Image
        source={route.params.uri_image}
        style={{
          resizeMode: 'cover',
          width: 200,
          height: 200,
          borderRadius: 100,
          //backgroundColor: 'orange',
        }}
      />
     </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
