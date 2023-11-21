import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Students from '../components/Students';
import PostHome from '../components/PostHome';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <Header title="Home" id={0} wd={0} />
      <ScrollView>
        <Students />
        <PostHome />
      </ScrollView>
    </SafeAreaView>
  );
}
