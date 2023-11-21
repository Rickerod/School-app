import React, {useState} from 'react';
import { View, Text, Image, Button } from 'react-native';
import { ImagePicker } from 'expo-image-multiple-picker'

export default function HolaMundo2() {
  const [open, setOpen] = useState(false)
  const [assets, setAssets] = useState([])

  console.log("OPEN", open)
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

  console.log(assets)
  return (
    <View style={{flex: 1, justifyContent:'center', alignContent:'center'}}>
      <Button title="Seleccionar imagen" color='orange' onPress={() => setOpen(true)}></Button>
    </View>
  )
}
