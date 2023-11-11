import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, BackHandler } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import EditPost from './EditPost';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import ImageComments from './ImageComments';
import comments from '../storage/data/comments.json'

export default function Post() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const navigation = useNavigation()

  const [image, setImage] = useState(null)

  const pickImage = async () => {
    const { status } = await requestPermission();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Tipo de datos", result.assets[0].type)
      if (result.assets[0].type === "image") {
        //Logica agregar imagen en el dispositivo y en la nube
        setImage(result.assets[0].uri);
      }
      else {
        //Logica agregar video en el dispositivo y en la nube
      }
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      {
        image !== null ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity onPress={() => setImage(null)}>
                <Ionic name="close-outline" style={{ fontSize: 35 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Editar publicación</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditPost")}>
                <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
              </TouchableOpacity>
            </View>
            <Image
              style={{
                flex: 1,
                resizeMode: "contain", //cover,
              }}
              source={{ uri: image }}
            />
          </View>

          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              position: 'absolute', width: windowWidth * 7 / 8, height: windowHeight * 7 / 8, backgroundColor: '#F8F9F9',
              borderStyle: 'dotted', borderWidth: 1, borderColor: '#ccc'
            }}>

            </View>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                flex: 1,
                width: windowWidth,
                height: windowHeight,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionic name="images-outline" style={{ fontSize: 50 }} />
              <Text> Añadir publicación </Text>
            </TouchableOpacity>
          </View>
      }

    </View>
  );
}
