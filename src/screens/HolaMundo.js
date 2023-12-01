import React from 'react';
import { View, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import Feather from 'react-native-vector-icons/Feather';

export default function HolaMundo() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{ backgroundColor: 'green', alignSelf: 'center'}}> Hola </Text>
      </View>
    </SafeAreaView>
  );
}
