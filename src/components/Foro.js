import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const PostForum = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerPostForum} >
      <TouchableOpacity onPress= {() => navigation.navigate("ForoComments", {
        data : data
      })}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={data.postPersonImage}
              style={{ width: 30, height: 30, borderRadius: 100 }}
            />
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                {data.postTitle}
              </Text>
              <Text style={{ fontSize: 11, color: 'gray' }}>
                oct. 05
              </Text>
            </View>
          </View>
          <Feather name="more-vertical" style={{ fontSize: 20 }} />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
            Movil máximo a 180 euros ¿Habrá algo decente a ultimos de 2023?
          </Text>
          <Text>
            Hola chic@s, necesito un teléfono móvil que ronde ese precio de algo menos de 200 euros. Lo necesito con unos 6Gb de RAM, por que con solo 4,
            creo quedará cortito. No lo voy a comprar en Aliexpres...
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

//Renderiza el separador de cada Item o Actividad.
const renderSeparator = () => (
  <View
    style={{
      backgroundColor: '#E3E3E3',
      height: 4,
    }}
  />
);


export default function Foro() {

  const dataForum = [
    {
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/userProfile.png'),
      likes: 765,
      isLiked: false,
    },
    {
      postTitle: 'chillhouse',
      postPersonImage: require('../storage/images/profile5.jpg'),
      postImage: require('../storage/images/post2.jpg'),
      likes: 345,
      isLiked: false,
    },
    {
      postTitle: 'Tom',
      postPersonImage: require('../storage/images/profile4.jpg'),
      postImage: require('../storage/images/post3.jpg'),
      likes: 734,
      isLiked: false,
    },
    {
      postTitle: 'The_Groot',
      postPersonImage: require('../storage/images/profile3.jpg'),
      postImage: require('../storage/images/post4.jpg'),
      likes: 875,
      isLiked: false,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={dataForum}
        renderItem={({ item }) => <PostForum data={item}></PostForum>}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  containerPostForum: {
    flex: 1,
    padding: 10
  }
})