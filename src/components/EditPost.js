import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, Pressable, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from 'react-native-modal-loader';

import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser';

import Ionic from 'react-native-vector-icons/Ionicons';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../config/firebaseConfig";
import { apiUrl } from '../../constants';

//import axios from 'axios';



export default function EditPost({ route }) {
    const { assets, fileType } = route.params
    const [isLoading, setIsLoading] = useState(false);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const user = useUser()
    console.log("USER", user)
    //const apiUrl = process.env.HOST;

    const navigation = useNavigation()


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [text, setText] = useState('');

    const [items, setItems] = useState([
        { label: 'Imagen', value: 'imagen' },
        { label: 'Video', value: 'video' },
        { label: 'Encuesta', value: 'encuesta' },
        { label: 'Pizarra', value: 'pizarra' },
    ]);


    const handleTextChange = enteredText => {
        setText(enteredText);
    }


    const uploadPost = async () => {
        setIsLoading(true)

        const body = {
            post_description: text,
            post_category: value,
        }

        var data = ""
        try {
            const response = await fetch(`http://${apiUrl}/posts/${user.id_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            data = await response.json();

        } catch (error) {
            console.error(error);
        }

        //console.log(data)

        //text, value, user.id_user, date.time.now(), num_likes = 0
        //Upload images



        // Crear un array de promesas
        const uploadPromises = assets.map(async (asset) => {
            const response = await fetch(asset.uri);
            const blob = await response.blob();

            const storageRef = ref(storage, "Stuff/" + new Date().getTime());
            const uploadTask = uploadBytesResumable(storageRef, blob);

            return new Promise((resolve, reject) => {
                // Escuchar eventos
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                        reject(error); // Rechazar la promesa en caso de error
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(async (downloadURL) => {
                                console.log("File available at", downloadURL);
                                // Guardar registro
                                await saveRecord(fileType, downloadURL, new Date().toISOString());
                                // Insertar imagen en BD MySQL
                                await saveRecordSQL(data.report.id, downloadURL);
                                resolve(downloadURL); // Resolver la promesa con la URL de descarga
                            })
                            .catch((error) => {
                                reject(error); // Rechazar la promesa en caso de error al obtener la URL de descarga
                            });
                    }
                );
            });
        });

        // Esperar a que todas las promesas se resuelvan
        try {
            await Promise.all(uploadPromises);

            // Realizar la operación de navegación después de que todas las promesas se hayan resuelto
            navigation.reset({
                index: 0,
                routes: [{ name: "TabScreen" }],
            });

            ToastAndroid.show('Publicación realizada!', ToastAndroid.SHORT);
        } catch (error) {
            // Manejar errores si alguna de las promesas falla
            console.error("Error uploading files:", error);
        } finally {
            setIsLoading(false);
        }

    }

    async function saveRecord(fileType, url, createdAt) {
        try {
            const docRef = await addDoc(collection(db, "files"), {
                fileType,
                url,
                createdAt,
            });
            console.log("document saved correctly", docRef.id);
        } catch (e) {
            console.log(e);
        }
    }

    async function saveRecordSQL(id, downloadURL) {

        const body = {
            id_post: id,
            url_image: downloadURL
        }

        console.log("id", id)
        console.log("downloadUrl", downloadURL)

        try {
            const response = await fetch(`http://${apiUrl}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            console.log(data)

        } catch (error) {
            console.error("ERROR", error);
        }
    }


    //console.log(isLoading)

    return (
        <View style={{ flex: 1 }}>
            <Loader loading={isLoading} color="black" />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionic name="close-outline" style={{ fontSize: 35 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Editar publicación</Text>
                <TouchableOpacity
                    onPress={uploadPost} >
                    <Ionic name="checkmark" style={{ fontSize: 35, color: 'purple' }} />
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: 14,
                fontWeight: 600,
                marginVertical: 8,
                marginLeft: 5
            }}> Descripción </Text>
            <TextInput
                //style={styles.textInput}
                style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginHorizontal: 5, paddingHorizontal: 10 }}
                placeholder="Escribe aquí..."
                multiline={true}
                maxLength={200}
                numberOfLines={12}
                onChangeText={handleTextChange}
                value={text}
            />
            <Text style={{
                fontSize: 14,
                fontWeight: 500,
                marginTop: 30,
                marginLeft: 5
            }}> Categoria </Text>

            <View style={{ padding: 5 }}>

                <DropDownPicker
                    style={{ borderColor: 'gray', alignSelf: 'center', borderRadius: 5, textColor: 'gray' }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder='Selecciona una categoria'
                    placeholderStyle={{ color: 'gray' }}
                    selectedTextStyle={{
                        fontSize: 16,
                        color: '#525151'
                    }}
                />
            </View>

        </View>
    );
}
