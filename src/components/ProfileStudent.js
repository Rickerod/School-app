import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import Profile from '../screens/Profile';

export default function ProfileStudent({ username, firstname, lastname, uri_image_profile, user_description }) {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //const { username, firstname, lastname, uri_image_profile, user_description } = route.params
  console.log(username)

  return (
    <View>
        <View style={styles.container}>
          <Header title="Perfil" id={1} wd={0} />
          <View style={{
            marginTop: windowHeight / 8,
            alignItems: 'center'
          }}
          >
            <View
              style={{
                //backgroundColor: 'green',
                width: windowWidth / 2.5,
                height: windowHeight / 5,
                borderWidth: 1.8,
                borderRadius: 100,
                borderColor: '#c13584',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{ uri: uri_image_profile }}
                style={{
                  resizeMode: 'cover',
                  width: '95%',
                  height: '95%',
                  borderRadius: 100,
                  //backgroundColor: 'green',
                  alignSelf: 'center'
                }}
              />
            </View>
            <Text style={{
              paddingBottom: 20,
              fontSize: 17,
              fontWeight: 600
            }}>
              {/* {data[0].username !== null && data[0].username} */}
            </Text>
          </View>
          <View style={{
            //backgroundColor: 'red',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
            <Text
              style={{
                opacity: 0.6,
                alignSelf: 'center',
                textAlign: 'center',
                paddingBottom: 40,
                //marginHorizontal: 20,
              }}> {user_description}
            </Text>

            <View>
              <Text style={{
                opacity: 0.7
              }}>
                Nombre
              </Text>
              <Text style={{
                opacity: 0.5
              }}>
                {firstname} {lastname}
              </Text>
            </View>
            <View>
              <Text style={{
                paddingTop: 10,
                opacity: 0.7
              }}>
                Edad
              </Text>
              <Text style={{
                opacity: 0.5
              }}>
                15
              </Text>
            </View>
            <View>
              <Text style={{
                paddingTop: 10,
                opacity: 0.7
              }}>
                Fecha de cumpleaños
              </Text>
              <Text style={{
                opacity: 0.5
              }}>
                23 de mayo
              </Text>
            </View>

          </View>
        </View >
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
  }
})
