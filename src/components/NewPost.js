import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, BackHandler, Alert } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
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

import { Video, ResizeMode } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function NewPost() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const navigation = useNavigation()

  const [open, setOpen] = useState(false)
  const [assets, setAssets] = useState([])
  
  const [openVideo, setOpenVideo] = useState(false)
  const [video, setVideo] = useState([])
  
  const videoRef = React.useRef(null);

  const [status, setStatus] = React.useState({});
  const [thumbnail, setThumbnail] = useState(null);

  const generateThumbnail = async (video) => {
    console.log("generateThumbnail", video)
    try {
      // Ruta del video

      // Obtener la miniatura
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        video[0].uri,
        {
          time: 0,
        }
      );

      // Actualizar el estado con la miniatura
      setThumbnail(uri);
    } catch (error) {
      console.error('Error al obtener la miniatura:', error);
    }
  };


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
        timeSlider
      />
    )
  }

  if (openVideo) {
    return (
      <ImagePicker
        onSave={async (video) =>{
          setVideo(video)
          generateThumbnail(video)
          setOpenVideo(false)
        }}
        onCancel={() => {
          setVideo([])
          setOpenVideo(false)
        }}
        video
        image={false}
        noAlbums
      />
    )
  }

  const isPlayingVideo = () => {
    if (status.isPlaying) videoRef.current.pauseAsync()
    else videoRef.current.playAsync()
    //setMute(!mute)
  }

  console.log("video", video)
  console.log("thumbail", thumbnail)
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
      {
        assets.length !== 0 || video.length !== 0 ?
          <View style={{ flex: 1 }}>
            {assets.length !== 0 ?
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
                    onPress={() => navigation.navigate("EditPost", {
                      assets: assets,
                      fileType: "image"
                    }
                    )}>
                    <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
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
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <TouchableOpacity onPress={() => setVideo([])}>
                    <Ionic name="close-outline" style={{ fontSize: 35 }} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Editar publicación</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditPost", {
                      assets: video,
                      fileType: "video",
                      thumbnail: thumbnail
                    }
                    )}>
                    <Ionic name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={isPlayingVideo}
                    style={{ flex: 1 }}>
                    <Video
                      ref={videoRef}
                      source={{
                        uri: video[0].uri,
                      }}
                      style={{ position: 'absolute', width: '100%', height: "100%" }}
                      //useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                      isLooping
                      onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />

                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>

          :
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{
              flex: 1, justifyContent: 'center', backgroundColor: '#F8F8F8',
              borderStyle: 'dotted', borderWidth: 1, borderColor: '#ccc'
            }}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionic name="images-outline" style={{ fontSize: 50 }} />
                <Text> Añadir publicación </Text>
              </TouchableOpacity>

            </View>
            <View style={{
              flex: 1, marginTop: 20, backgroundColor: '#F8F8F8',
              borderStyle: 'dotted', borderWidth: 1, borderColor: '#ccc'
            }}>
              <TouchableOpacity
                onPress={() => Alert.alert("En mantenimiento...")}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Octicons name="video" style={{ fontSize: 50 }} />
                <Text style={{paddingBottom: 30}}> Añadir video </Text>
              </TouchableOpacity>
            </View>
          </View>
      }

    </View >
  );
}
