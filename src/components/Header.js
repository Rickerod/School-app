import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


export default function Header({ title, id, wd }) {
    const navigation = useNavigation();
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const pickImage = async () => {
        const { status } = await requestPermission();
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
                //Logica agregar imagen en el dispositivo y en la nube
            }
            else {
                //Logica agregar video en el dispositivo y en la nube
            }
          }
    }

    return (
        <View backgroundColor={id === 0 ? "white" : "purple"}>
            <StatusBar
                backgroundColor={id === 0 ? "white" : "purple"}
                barStyle="dark-content"
                animated={true}
            />
            <SafeAreaView
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 15,
                    marginBottom: 15,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>
                {/*<FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />*/}
                <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
                    {id !== 0 ?
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
                            <Ionic name="arrow-back" style={{ fontSize: 25, color: 'white', paddingRight: 20 }} />
                        </TouchableOpacity>
                        : null}
                    <Text
                        style={{
                            //fontFamily: 'Cochin',
                            fontSize: 20,
                            fontWeight: '500',
                            color: id !== 0 ? "white" : undefined
                        }}>
                        {title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {wd === 1 &&
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={pickImage}
                        >
                            <Feather name="plus-square" style={{ fontSize: 28, borderRadius: 30 }} />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => console.log("Click on bell...")}
                    >
                        <Fontisto name="bell" style={{ fontSize: 24, paddingLeft: 20, color: id !== 0 ? "white" : undefined }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => console.log("Click on cog...")}
                    >
                        <Entypo name="cog" style={{ fontSize: 24, paddingLeft: 20, color: id !== 0 ? "white" : undefined }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}
