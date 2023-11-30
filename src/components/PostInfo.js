import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from "axios"

import { useNavigation } from '@react-navigation/native';
import { useLike } from '../context/LikeContext';
import useUser from '../hooks/useUser';

import ImageComments from './ImageComments';
//import comments from '../storage/data/comments.json';

import {
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FlatList } from 'react-native-gesture-handler';

export default function PostInfo({ data }) {
    const { likes, toggleLike } = useLike();

    const windowWidth = Dimensions.get('window').width;
    const commentsSheetRef = useRef(null);
    const [isShowing, setIsShowing] = useState(false);
    const [comments, setComments] = useState([]);

    const navigation = useNavigation();
    const user = useUser()


    const apiUrl = process.env.HOST;

    useEffect(() => {
        const backAction = () => {
            if (isShowing) {
                commentsSheetRef.current.close()
                return true;
            }
            return false
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [isShowing]);

    const openComments = () => {
        commentsSheetRef.current?.present();
        setIsShowing(true)
    };


    //Cargar comentarios al post
    const loadComments = async () => {
        try {
            const response = await axios.get(`http://${apiUrl}/comments/${data.id_post}`);
            setComments(response.data)

        } catch (error) {
            console.log("Error", error);
        }
    }

    const handleSheetChanges = (index) => {
        //console.log('handleSheetChanges', index)
        if (index >= 0) {
            //loadComments()
            setIsShowing(true)
        } else {
            setIsShowing(false)
        }
    }

    const sendComment = async () => {
        console.log("Enviando comentario...")
    };

    const insertLike = async (is_liked) => {

        //console.log("IS_liked", is_liked)

        const body = {
            is_liked: is_liked,
        }

        try {
            const response = await fetch(`http://${apiUrl}/like/${data.id_post}/${user.id_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const response_json = await response.json();
            //console.log(response_json)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View
            //key={index}
            style={{
                paddingBottom: 10,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.1,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 15,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: data.uri_image_profile }}
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                    <View style={{ paddingLeft: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {data.username}
                        </Text>
                    </View>
                </View>
                <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SingleContentImage', {
                uri_images: data.images,
                id_post: data.id_post,
                num_likes: data.num_likes,
            })}>
                <View
                    style={{
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <FlatList
                        data={data.images}
                        horizontal={true}
                        renderItem={({ item }) =>
                            <View>
                                <Image
                                    source={{ uri: item.url_image }}
                                    style={{
                                        resizeMode: "cover",
                                        width: windowWidth,
                                        height: 400

                                    }}
                                />
                            </View>

                        }
                        pagingEnabled
                    />
                </View>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        toggleLike(data.id_post)
                        insertLike(!likes[data.id_post])
                    }}>
                        <AntDesign
                            name={likes[data.id_post] ? 'heart' : 'hearto'}
                            style={{
                                paddingRight: 10,
                                fontSize: 20,
                                color: likes[data.id_post] ? 'red' : 'black',
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openComments}>
                        <Ionic
                            name="ios-chatbubble-outline"
                            style={{ fontSize: 20, paddingRight: 10 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text>
                    Le gusta a {likes[data.id_post] ? data.num_likes + 1 : data.num_likes} personas más
                </Text>
                <Text
                    style={{
                        fontWeight: '700',
                        fontSize: 14,
                        paddingVertical: 2,
                    }}>
                    {data.post_description}
                </Text>
                <TouchableOpacity onPress={() => commentsSheetRef.current?.present()}>
                    <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                        Ver los comentarios
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomSheetModal
                ref={commentsSheetRef}
                snapPoints={["100%"]}
                index={0}
                onChange={handleSheetChanges}
                backgroundComponent={({ style }) => (
                    <View style={[style, { backgroundColor: "#fff" }]} />
                )}
            >

                <ImageComments
                    id_post={data.id_post}
                />
            </BottomSheetModal>
        </View>
    );
}
