import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, BackHandler, Pressable } from 'react-native';

import PostInfo from './PostInfo';

import { FlatList } from 'react-native-gesture-handler';


export default function PostHome() {
    const [data, setData] = useState([])

    const postInfo = [
        {
            postTitle: 'mr shermon',
            postPersonImage: require('../storage/images/userProfile.png'),
            postImage: require('../storage/images/post1.jpg'),
            likes: 765,
            isLiked: false,
        },
        {
            postTitle: 'chillhouse',
            postPersonImage: require('../storage/images/profile5.jpg'),
            postImage: require('../storage/images/post2.jpg'),
            likes: 345,
            isLiked: false,
        },
        {
            postTitle: 'Tom',
            postPersonImage: require('../storage/images/profile4.jpg'),
            postImage: require('../storage/images/post3.jpg'),
            likes: 734,
            isLiked: false,
        },
        {
            postTitle: 'The_Groot',
            postPersonImage: require('../storage/images/profile3.jpg'),
            postImage: require('../storage/images/post4.jpg'),
            likes: 875,
            isLiked: false,
        },
    ];

    //Obtener las 6 publicaciones mas recientes
    useEffect(() => {
        const fetchPost = async () => {
            const idUsuario = 1
            const response = await fetch(`http://192.168.0.14:3000/home/${idUsuario}`)
            const dataResponse = await response.json();
            setData(dataResponse)
        }

        fetchPost()
    }, [])

    if (data == []) {
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
