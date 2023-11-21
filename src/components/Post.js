import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, BackHandler } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import EditPost from './EditPost';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import ImageComments from './ImageComments';
import comments from '../storage/data/comments.json'
import { FlatList } from 'react-native-gesture-handler';
import { ImagePicker } from 'expo-image-multiple-picker'

export default function Post() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const navigation = useNavigation()

  const [image, setImage] = useState(null)
  const [open, setOpen] = useState(false)
  const [assets, setAssets] = useState([])

  if (open) {
    return (
      <ImagePicker
        onSave={(assets) => {
          setAssets(assets)
          setOpen(false)
        }}
        onCancel={() => {
          setAssets([])
          setOpen(false)
        }}
        multiple
        noAlbums
      />
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      {
        assets.length != 0 ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <TouchableOpacity onPress={() => setAssets([])}>
                <Ionic name="close-outline" style={{ fontSize: 35 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Editar publicación</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditPost")}>
                <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1}}>
              <FlatList
                key={'__'}
                data={assets}
                numColumns={2}
                renderItem={({ item }) =>
                  <View style={{ paddingBottom: 2, width: '50%' }}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{ width: '99%', height: 300 }}
                    />
                  </View>
                }
              />
            </View>
          </View>

          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              position: 'absolute', width: windowWidth * 7 / 8, height: windowHeight * 7 / 8, backgroundColor: '#F8F9F9',
              borderStyle: 'dotted', borderWidth: 1, borderColor: '#ccc'
            }}>

            </View>
            <TouchableOpacity
              onPress={() => setOpen(true)}
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

    </View >
  );
}
