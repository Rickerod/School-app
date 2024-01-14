import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useUser from '../hooks/useUser';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { apiUrl } from '../../constants';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function Posts({ route, navigation }) {
    const [data, setData] = useState([])
    const { id_user } = route.params

    const windowWidth = Dimensions.get('window').width;

    //const apiUrl = process.env.HOST;

    const user = useUser()

    useFocusEffect(
        useCallback(() => {
            const type_post = "imagen";
    
            const fetchPost = async () => {
                console.log("id's", id_user, user.id_user);
                const response = await fetch(`http://${apiUrl}/posts/profile/${type_post}/${id_user}/${user.id_user}`);
    
                const dataResponse = await response.json();
                console.log("dataResponse", dataResponse);
                setData(dataResponse);
            };
    
            fetchPost();
        }, []) // Incluye todas las dependencias aquí
    );

    if (data == []) {
        return <View></View>
    }
    return (
        <FlatList
            key={'_'}
            data={data}
            numColumns={3}
            //horizontal={true}
            contentcontainerstyle={{ justifyContent: 'space-between', alignItems: 'space-between', flexdirection: 'row', flexwrap: 'wrap' }}
            renderItem={({ item }) => {
                if (item.images.length == 0) {
                    return <View></View>
                }

                return (
                    <TouchableOpacity
                        //key={imgIndex}
                        onPress={() => navigation.navigate('SingleContentImage', {
                            uri_images: item.images,
                            id_post: item.id_post,
                            islike: item.is_liked,
                            num_likes: item.num_likes,
                            uri_image_profile: item.uri_image_profile,
                            username: item.username,
                            description: item.post_description
                        })}
                        style={{ paddingBottom: 2, width: '33%' }}>

                        {item.images.length <= 1 ?
                            <Image
                                source={{ uri: item.images[0].url_image }}
                                style={{ width: '100%', height: 150 }}
                            /> :
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={{ uri: item.images[0].url_image }}
                                    style={{ width: '100%', height: 150 }}
                                />
                                <View style={{ position: "absolute", top: 5, left: windowWidth / 3 - 30, right: 0 }}>
                                    <Ionicons
                                        size={20}
                                        style={{ opacity: 0.9 }}
                                        color="white"
                                        name='images'
                                    />
                                </View>
                            </View>

                        }
                    </TouchableOpacity>
                );
            }}
        />
    );
}
