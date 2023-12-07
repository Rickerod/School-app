import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, BackHandler, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
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



const PostImages = ({item, index, length}) => {
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

export default function PostInfo({ data }) {
    const { numLikes, likes, toggleLike, toggleNumLikes } = useLike();

    const windowWidth = Dimensions.get('window').width;
    const commentsSheetRef = useRef(null);
    const [isShowing, setIsShowing] = useState(false);
    const [comments, setComments] = useState([]);
    //const [numLikes, setNumLikes ] = useState(data.num_likes)
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const user = useUser()

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
                <Menu>
                    <MenuTrigger>
                        <Feather name="more-vertical" style={{ fontSize: 20 }} />
                    </MenuTrigger>
                    <MenuOptions style={{ padding: 10 }}>

                        {
                            data.id_author_post === user.id_user ?
                                <MenuOption onSelect={() => console.log("Eliminar post")} >
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
            <TouchableOpacity onPress={() => navigation.navigate('SingleContentImage', {
                uri_images: data.images,
                id_post: data.id_post,
                islike: likes[data.id_post],
                num_likes: numLikes[data.id_post],
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
                        renderItem={({ item, index }) => <PostImages item={item} index={index} length={data.images.length}/>}
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
