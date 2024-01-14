import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Loader from 'react-native-modal-loader';
import axios from "axios"

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import { useNavigation } from '@react-navigation/native';
import { useLike } from '../context/LikeContext';
import useUser from '../hooks/useUser';

import ImageComments from './ImageComments';
//import comments from '../storage/data/comments.json';

import {
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { FlatList } from 'react-native-gesture-handler';
import Report from './Report';
import { apiUrl } from '../../constants';
import { Video, ResizeMode } from 'expo-av';

const PostImages = ({ item, index, length }) => {
    const [imageHeight, setImageHeight] = useState(0);

    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {

        Image.getSize(item.url_image, (width, height) => {

            const calculatedHeight = (windowWidth / width) * height;
            setImageHeight(calculatedHeight);

        }, (error) => {
            console.error('Error al obtener el tamaño de la imagen:', error);
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Image
                source={{ uri: item.url_image }}
                style={{
                    flex: 1,
                    resizeMode: "contain",
                    width: windowWidth,
                    height: imageHeight

                }}
            />
            {
                length > 1 &&
                <View style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: 'black',
                    borderRadius: 50,
                    padding: 5,
                    opacity: 0.8


                }}>

                    <Text style={{ fontSize: 13, color: 'white' }}> {index + 1}/{length} </Text>

                </View>
            }
        </View>
    );
}

export default function PostInfo({ data, updateHome }) {
    const { numLikes, likes, toggleLike, toggleNumLikes } = useLike();

    const commentsSheetRef = useRef(null);
    const [isShowing, setIsShowing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const user = useUser()

    const videoRef = React.useRef(null)
    const [status, setStatus] = React.useState({});
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //const apiUrl = process.env.HOST;

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


    const handleSheetChanges = (index) => {
        //console.log('handleSheetChanges', index)
        if (index >= 0) {
            //loadComments()
            setIsShowing(true)
        } else {
            setIsShowing(false)
        }
    }

    const insertLike = async (is_liked) => {

        //console.log("IS_liked", is_liked, data.id_post, user.id_user)

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

    const removePost = async () => {
        setIsLoading(true)

        try {

            const response = await fetch(`http://${apiUrl}/posts/${data.id_post}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const response_json = await response.json();

            updateHome(prev => !prev)
        } catch (e) {
            console.log("ERROR", e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View
            //key={index}
            style={{
                //paddingBottom: 10,
                borderBottomColor: 'gray',
                flex: 1,
                borderBottomWidth: 0.1,
            }}>
            <Loader loading={isLoading} color="black" />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: data.uri_image_profile }}
                        style={{ resizeMode: "contain", width: 40, height: 40, borderRadius: 100 }}
                    />
                    <View style={{ paddingLeft: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {data.username}
                        </Text>
                    </View>
                </View>
                <Menu>
                    <MenuTrigger>
                        <Feather name="more-vertical" style={{ fontSize: 20 }} />
                    </MenuTrigger>
                    <MenuOptions style={{ padding: 10 }}>

                        {
                            data.id_author_post === user.id_user || user.id_user == 1 ?
                                <MenuOption onSelect={() => removePost()} >
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Octicons name="trash" style={{ fontSize: 20, color: 'red', paddingRight: 5 }}></Octicons>
                                        <Text style={{ color: 'red', fontSize: 16 }}> Eliminar </Text>
                                    </View>
                                </MenuOption>
                                :
                                <MenuOption onSelect={() => setModalVisible(true)} >
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Octicons name="report" style={{ fontSize: 20, color: 'red', paddingRight: 5 }}></Octicons>
                                        <Text style={{ color: 'red', fontSize: 16 }}> Reportar</Text>
                                    </View>
                                </MenuOption>
                        }
                        {/* <MenuOption onSelect={() => console.log("Cancel!")}>
                            <Text style={{ color: 'white', fontSize: 15, paddingLeft: 25 }}> Cancelar</Text>
                        </MenuOption> */}
                    </MenuOptions>
                </Menu>
            </View>

            {data.post_category == "video" ?
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SingleContentVideo", {
                            uri_video: data.video_url,
                            id_post: data.id_post,
                            islike: likes[data.id_post],
                            num_likes: numLikes[data.id_post],
                            uri_image_profile: data.uri_image_profile,
                            username: data.username,
                            description: data.post_description
                        })}
                        style={{ flex: 1 }}
                    >
                        <Image
                            source={{
                                uri: data.thumbnail_video,
                            }}
                            style={{ width: windowWidth, height: 400 }}
                        />
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Ionic name="play-circle-outline" style={{ color: 'white' }} size={70} />
                        </View>

                    </TouchableOpacity>
                </View>
                :
                <TouchableOpacity onPress={() => navigation.navigate('SingleContentImage', {
                    uri_images: data.images,
                    id_post: data.id_post,
                    islike: likes[data.id_post],
                    num_likes: numLikes[data.id_post],
                    uri_image_profile: data.uri_image_profile,
                    username: data.username,
                    description: data.post_description

                })}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>

                        <FlatList
                            data={data.images}
                            horizontal={true}
                            pagingEnabled
                            renderItem={({ item, index }) => <PostImages item={item} index={index} length={data.images.length} />}
                        />
                    </View>
                </TouchableOpacity>
            }
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingTop: 10,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        toggleLike(data.id_post)
                        insertLike(!likes[data.id_post])
                        toggleNumLikes(data.id_post, !likes[data.id_post])
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
                    Le gusta a {numLikes[[data.id_post]]} personas más
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
                    id_post={data.id_post} user={user}
                />
            </BottomSheetModal>
            <Report modalVisible={modalVisible} fModalVisible={setModalVisible} />
        </View >
    );
}
