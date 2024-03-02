import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, BackHandler, RefreshControl, Pressable } from 'react-native';
import axios from 'axios';

import PostInfo from './PostInfo';

import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import useUser from '../hooks/useUser';
import { useLike } from '../context/LikeContext';
import { apiUrl } from '../../constants';

export default function PostHome() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { initializeLike } = useLike();
    const [update, setUpdate] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const user = useUser()

    //const apiUrl = process.env.HOST;

    //Obtener las 6 publicaciones mas recientes
    useEffect(() => {
        //Enviar el id del usuario como query para obtener las publicaciones a las que les dió like...
        async function fetchPost() {

            try {

                const response = await fetch(`http://${apiUrl}/posts/${user.id_user}`)
                const dataResponse = await response.json();

                setData(dataResponse)

                /* const response = await axios.get(`http://${apiUrl}/home`, { params: params });
                setData(response.data) */

                const initializeLikes = dataResponse.reduce((result, post) => {
                    result[post.id_post] = post.is_liked;
                    return result;
                }, {});

                const initializeNumLikes = dataResponse.reduce((result, post) => {
                    result[post.id_post] = post.num_likes;
                    return result;
                }, {});

                initializeLike(initializeLikes, initializeNumLikes)

                setLoading(true)
            } catch (error) {
                console.log("Error", error);
            }
        }

        fetchPost()
    }, [update])

    if (!loading) {
        return <View></View>
    }

    return (
        <View style={{}}>
        <FlatList
            scrollEnabled={false}
            data={data}
            renderItem={({ item }) => <PostInfo data={item} updateHome={setUpdate}></PostInfo>}
        />
        </View>
    );
}
