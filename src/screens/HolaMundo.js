import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';

export default function HolaMundo() {

  const [refreshing, setRefreshing] = useState(false);

  
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13 , 14 , 15,
  ]

  const onRefresh = async () => {
    setRefreshing(true)

    setTimeout(() => {
      console.log("Hola a todos")
    }, 1000)

    setRefreshing(false)
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => <View>
          <Text>
            Numero : {item}
          </Text>
        </View>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FC4C02']} />
        }
      />
    </SafeAreaView>
  );
}
