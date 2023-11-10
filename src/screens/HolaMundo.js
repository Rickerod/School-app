import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null)

  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Tipo de datos", result.assets[0].type)
      if (result.assets[0].type === "image") {
        setImage(result.assets[0].uri);
        setVideo(null)
      }
      else {
        setVideo(result.assets[0].uri)
        setImage(null)
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button style={{ margin : 30}} title="Pick an image from camera roll" onPress={pickImage} />
      {image &&
        <Image
          source={{ uri: image }}
          style={{
            width: 300,
            height: 300,
            resizeMode: "contain"
          }}
        />
      }
      {video &&
        <Video
          ref={videoRef}
          source={{ uri: video }}
          style={{ width: '100%', height: 150, backgroundColor: 'gray' }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      }

    </View>
  );
}
