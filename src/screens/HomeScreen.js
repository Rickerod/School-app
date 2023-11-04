import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'


export default function HomeScreen() {
  const storyInfo = [
    {
      id: 1,
      name: 'Your Story',
      image: require('../storage/images/userProfile.png'),
    },
    {
      id: 0,
      name: 'Ram_Charan',
      image: require('../storage/images/profile1.jpg'),
    },
    {
      id: 0,
      name: 'Tom',
      image: require('../storage/images/profile2.jpg'),
    },
    {
      id: 0,
      name: 'The_Groot',
      image: require('../storage/images/profile3.jpg'),
    },
    ,
    {
      id: 0,
      name: 'loverland',
      image: require('../storage/images/profile4.jpg'),
    },
    ,
    {
      id: 0,
      name: 'chillhouse',
      image: require('../storage/images/profile5.jpg'),
    },
  ];


  return (

    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      {/* ----Header ----*/}
      <SafeAreaView
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingTop: 15,
          paddingHorizontal: 15,
          alignItems: 'center',
        }}>
        {/*<FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />*/}
        <Text
          style={{
            //fontFamily: 'Cochin',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Home
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log("Click on bell...")}
          >
            <Fontisto name="bell" style={{ fontSize: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => console.log("Click on cog...")}
          >
            <Entypo name="cog" style={{ fontSize: 24, paddingLeft: 20 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* ----Header ----*/}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 20, backgroundColor: 'white' }}>
        {storyInfo.map((data, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                console.log("Holanda")
              }>
              <View
                style={{
                  flexDirection: 'column',
                  paddingHorizontal: 8,
                }}>
                <View
                  style={{
                    width: 68,
                    height: 68,
                    backgroundColor: 'white',
                    borderWidth: 1.8,
                    borderRadius: 100,
                    borderColor: '#c13584',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={data.image}
                    style={{
                      resizeMode: 'cover',
                      width: '92%',
                      height: '92%',
                      borderRadius: 100,
                      backgroundColor: 'orange',
                    }}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                  }}>
                  {data.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
