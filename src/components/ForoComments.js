import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

import Header from './Header';

const PostComments = ({ data }) => {

  return (
    <View style={styles.container}>
      {data.id === 0 ? ( //data.id === 0 Post
        <View style={{ padding: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={data.postPersonImage}
                style={{ width: 80, height: 80, borderRadius: 100 }}
              />
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {data.postTitle}
                </Text>
                <Text style={{ fontSize: 14, color: 'gray' }}>
                  oct. 05
                </Text>
              </View>
            </View>
            <Feather name="more-vertical" style={{ fontSize: 20 }} />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
              Movil máximo a 180 euros ¿Habrá algo decente a ultimos de 2023?
            </Text>
            <Text style={{ fontSize: 15 }}>
              Hola chic@s, necesito un teléfono móvil que ronde ese precio de algo menos de 200 euros. Lo necesito con unos 6Gb de RAM, por que con solo 4,
              creo quedará cortito. No lo voy a comprar en Aliexpres  porque me parece poco confiable y tambíen porque lo necesito a mas tardar
              en los 3 proximas dias. Si algíen conoce algun movil a ese rango de precio se lo agradeceria.
            </Text>
          </View>
        </View>

      ) :
        <View style={{ padding: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={data.postPersonImage}
                style={{ width: 60, height: 60, borderRadius: 100 }}
              />
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {data.postTitle}
                </Text>
                <Text style={{ fontSize: 14, color: 'gray' }}>
                  oct. 05
                </Text>
              </View>
            </View>
            <Feather name="more-vertical" style={{ fontSize: 20 }} />
          </View>
          <View>
            <Text style={{ fontSize: 15 }}>
              {data.comment}
            </Text>
          </View>
        </View>}
    </View>
  );
}


//Renderiza el separador de cada Item o Actividad.
const renderSeparator = () => (
  <View
    style={{
      backgroundColor: '#E3E3E3',
      height: 10,
    }}
  />
);

export default function ForoComments({ route }) {
  const data = route.params.data

  const dataComments = [
    {
      id: 0,
      postTitle: 'mr shermon',
      postPersonImage: require('../storage/images/userProfile.png'),
      likes: 765,
      isLiked: false,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor ligula sit amet tortor bibendum, eu facilisis nisl mattis. Sed id eleifend libero. Sed in massa nec massa fringilla vehicula. Curabitur in justo erat. Nullam euismod diam non dui auctor, ac consectetur nisl tincidunt. Nullam vel odio nec tortor tristique rhoncus. Fusce venenatis, purus vel elementum volutpat, est nunc eleifend lorem, vel facilisis nisl sapien ut sapien. Phasellus sit amet cursus purus"
    },
    {
      id: 1,
      postTitle: 'chillhouse',
      postPersonImage: require('../storage/images/profile5.jpg'),
      postImage: require('../storage/images/post2.jpg'),
      likes: 345,
      isLiked: false,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor ligula sit amet tortor bibendum, eu facilisis nisl mattis. Sed id eleifend libero. Sed in massa nec massa fringilla vehicula. Curabitur in justo erat. Nullam euismod diam non dui auctor, ac consectetur nisl tincidunt. Nullam vel odio nec tortor tristique rhoncus. Fusce venenatis, purus vel elementum volutpat, est nunc eleifend lorem, vel facilisis nisl sapien ut sapien. Phasellus sit amet cursus purus"
    },
    {
      id: 2,
      postTitle: 'Tom',
      postPersonImage: require('../storage/images/profile4.jpg'),
      postImage: require('../storage/images/post3.jpg'),
      likes: 734,
      isLiked: false,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor ligula sit amet tortor bibendum, eu facilisis nisl mattis. Sed id eleifend libero. Sed in massa nec massa fringilla vehicula. Curabitur in justo erat. Nullam euismod diam non dui auctor, ac consectetur nisl tincidunt. Nullam vel odio nec tortor tristique rhoncus. Fusce venenatis, purus vel elementum volutpat, est nunc eleifend lorem, vel facilisis nisl sapien ut sapien. Phasellus sit amet cursus purus"
    },
    {
      id: 3,
      postTitle: 'The_Groot',
      postPersonImage: require('../storage/images/profile3.jpg'),
      postImage: require('../storage/images/post4.jpg'),
      likes: 875,
      isLiked: false,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum auctor ligula sit amet tortor bibendum, eu facilisis nisl mattis. Sed id eleifend libero. Sed in massa nec massa fringilla vehicula. Curabitur in justo erat. Nullam euismod diam non dui auctor, ac consectetur nisl tincidunt. Nullam vel odio nec tortor tristique rhoncus. Fusce venenatis, purus vel elementum volutpat, est nunc eleifend lorem, vel facilisis nisl sapien ut sapien. Phasellus sit amet cursus purus"
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="ditero_d" id={1} wd={0}/>
      <FlatList
        data={dataComments}
        renderItem={({ item }) => <PostComments data={item}></PostComments>}
        ItemSeparatorComponent={renderSeparator}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})
