import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, BackHandler, Pressable } from 'react-native';
import axios from 'axios';

import PostInfo from './PostInfo';

import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import useUser from '../hooks/useUser';

export default function PostHome() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    
    const user = useUser()

    const apiUrl = process.env.HOST;


    //Obtener las 6 publicaciones mas recientes
    /*  useEffect(() => {
         const fetchPost = async () => {
             const idUsuario = 1
             const response = await fetch(`http://192.168.0.14:3000/home/${idUsuario}`)
             const dataResponse = await response.json();
             setData(dataResponse)
         }
 
         fetchPost()
     }, []) */

    //Obtener las 6 publicaciones mas recientes
    useFocusEffect(
        React.useCallback(() => {

            async function fetchPost() {

                //Enviar el id del usuario como query para obtener las publicaciones a las que les dió like...
                const params = {
                    id : user.id_user
                }
                try {
                    const response = await axios.get(`http://${apiUrl}/home`, { params: params });
                    setData(response.data)
                    setLoading(true)
                } catch {
                    console.log("Error", error);
                }
            }

            fetchPost()
        }, [])
    );

    if (!loading) {
        return <View></View>
    }

    return (
        <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => <PostInfo data={item}></PostInfo>}
        />
    );
}
