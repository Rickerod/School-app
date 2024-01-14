import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Profile from '../screens/Profile';
import { useNavigation } from '@react-navigation/native';

export default function ProfileStudent({ id, username, firstname, lastname, uri_image_profile, user_description }) {


  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation()
  //const { username, firstname, lastname, uri_image_profile, user_description } = route.params
  console.log(username)

  return (
    <View>
      <View style={styles.container}>
        <Header title="Perfil" id={0} wd={0} />
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
          {id == 0 &&
            <View
              style={{
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                paddingVertical: 5,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('EditProfileStudent', {
                    accountName: username,
                    profileImage: uri_image_profile,
                    userDescription: user_description
                  })
                }
                style={{
                  width: '100%',
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 35,
                    borderRadius: 5,
                    borderColor: '#DEDEDE',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      letterSpacing: 1,
                      opacity: 0.8,
                    }}>
                    Edit Profile
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={{
          //backgroundColor: 'red',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
          <Text
            style={{
              opacity: 0.6,
              paddingTop: 20,
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
              Nombre de usuario:
            </Text>
            <Text style={{
              opacity: 0.5
            }}>
              {username}
            </Text>
          </View>
          <View>
            {/* <Text style={{
              paddingTop: 10,
              opacity: 0.7
            }}>
              Edad
            </Text> */}
           {/*  <Text style={{
              opacity: 0.5
            }}>
              15
            </Text> */}
          </View>
          {/* <View>
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
          </View> */}

        </View>
      </View >
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
  }
})
