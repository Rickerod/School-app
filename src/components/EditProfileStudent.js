import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput } from 'react-native';
import Loader from 'react-native-modal-loader';

import Ionicons from '@expo/vector-icons/Ionicons';
import { db, storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';



const EditProfileStudent = ({ route }) => {
    const { accountName, profileImage } = route.params;
    const [isLoading, setIsLoading] = useState(false);

    const [userName, setUserName] = useState(accountName)

    const [image, setImage] = useState(profileImage)
    const [userDescription, setUserDescription] = useState(route.params.userDescription)

    const user = useUser()
    const navigation = useNavigation()

    console.log(user.id_user)

    //Android
    const TostMessage = () => {
        ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
    };

    const uploadImageProfile = async () => {

        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, "Stuff/" + new Date().getTime());

        try {
            await uploadBytes(storageRef, blob);
            return getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    }

    const updateProfile = async () => {
        setIsLoading(true)
        const downloadURLImageProfile = await uploadImageProfile()

        console.log("downloadURLImageProfile", downloadURLImageProfile)

        const body = {
            user_name: userName,
            uri_image_profile: downloadURLImageProfile,
            user_description: userDescription
        }

        try {
            const response = await fetch(`http://${apiUrl}/users/${user.id_user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            console.log("data", data)

        } catch (error) {
            console.error("ERROR", error);
        } finally {
            setIsLoading(false)
            navigation.reset({
                index: 0,
                routes: [{ name: "TabScreen" }],
            });

        }


    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
            }}>
            <Loader loading={isLoading} color="black" />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-outline" style={{ fontSize: 35 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Editar perfil </Text>
                <TouchableOpacity
                    onPress={updateProfile}>
                    <Ionicons name="checkmark" style={{ fontSize: 35, color: '#3493D9' }} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Image
                    source={{ uri: image }}
                    style={{ resizeMode: "contain", width: 80, height: 80, borderRadius: 100 }}
                />
                <TouchableOpacity onPress={pickImage}>
                    <Text
                        style={{
                            color: '#3493D9',
                        }}>
                        Cambiar foto de perfil
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <View style={{ paddingTop: 10 }}>
                    <Text
                        style={{
                            opacity: 0.5,
                        }}>
                        Username
                    </Text>
                    <TextInput
                        placeholder="Nombre de usuario"
                        defaultValue={userName}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD',
                        }}
                        onChangeText={(enteredText) => setUserName(enteredText)}
                    />
                </View>
                <View style={{ paddingVertical: 10 }}>
                    <Text
                        style={{
                            opacity: 0.5,
                        }}>
                        Descripción
                    </Text>
                    <TextInput
                        placeholder="Descripción"
                        defaultValue={userDescription}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD',
                        }}
                        onChangeText={(enteredText) => setUserDescription(enteredText)}
                    />
                </View>

            </View>

        </View>
    );
};

export default EditProfileStudent;