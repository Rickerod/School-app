import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, BackHandler, Pressable } from 'react-native';
//import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios"

import {
    BottomSheetModalProvider,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import comments from '../storage/data/comments.json'
import ImageComments from './ImageComments';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { useLike } from '../context/LikeContext';
import useUser from '../hooks/useUser';
import { apiUrl } from '../../constants';


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
        <View style={{ flex: 1, justifyContent: 'center'}}>

            <View style={{alignSelf: 'flex-start'}}>
                <Image
                    source={{ uri: item.url_image }}
                    style={{
                        resizeMode: "contain",
                        width: windowWidth,
                        height: imageHeight,
                        backgroundColor: 'red'

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
        </View>
    );
}

const SingleContentImage = ({ route, navigation }) => {

    const { uri_images, id_post, islike, num_likes } = route.params

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { likes, toggleLike, toggleNumLikes } = useLike();
    const user = useUser()
    const [numLikes, setNumLikes] = useState(num_likes)
    const [is_like, setLike] = useState(islike)
    const [isShowing, setIsShowing] = useState(false);
    const commentsSheetRef = useRef(null);



    //const apiUrl = process.env.HOST;


    //Back action of the commentSheetRef for Android
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

        //console.log("IS_liked", is_liked)

        const body = {
            is_liked: is_liked,
        }

        try {
            const response = await fetch(`http://${apiUrl}/like/${id_post}/${user.id_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const response_json = await response.json();

        } catch (error) {
            console.error(error);
        }

        if (is_liked) setNumLikes((prev) => prev + 1)
        else setNumLikes((prev) => prev - 1)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    //justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1,
                    padding: 10,
                }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
                    <Ionic name="arrow-back" style={{ fontSize: 25, paddingRight: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Image
                </Text>
            </View>
            {/* <Image
                source={{ uri: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/post2.jpg" }}
                style={{
                    resizeMode: "cover", //cover
                    //backgroundColor: 'red',
                    width: '100%',
                    height: '100%',
                }}
            /> */}
            <FlatList
                data={uri_images}
                horizontal={true}
                renderItem={({ item, index }) => <PostImages item={item} index={index} length={uri_images.length} />
                }
                pagingEnabled
            />

            <View
                style={{
                    position: 'absolute',
                    bottom: windowHeight / 6, //edited
                    right: 8,
                    alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => {
                    insertLike(!is_like)
                    setLike((prev) => !prev)
                    console.log("like_id_post", !is_like, likes[id_post])
                    if (likes[id_post] !== undefined) {
                        toggleLike(id_post)
                        toggleNumLikes(id_post, !is_like)
                    }
                }
                }
                    style={{ paddingTop: 5 }}>
                    <AntDesign
                        name={is_like ? 'heart' : 'hearto'}
                        style={{ color: is_like ? 'red' : 'black', fontSize: 25 }}
                    />
                </TouchableOpacity>
                <Text> {numLikes} </Text>
                <TouchableOpacity onPress={openComments} style={{ padding: 10 }}>
                    <Ionic
                        name="ios-chatbubble-outline"
                        style={{ fontSize: 25 }}
                    />
                </TouchableOpacity>
            </View>
            {/* All comments */}
            <BottomSheetModal
                ref={commentsSheetRef}
                snapPoints={['100%']}
                index={0}
                onChange={handleSheetChanges}
                backgroundComponent={({ style }) => (
                    <View style={[style, { backgroundColor: "#fff" }]} />
                )}
            >
                <ImageComments id_post={id_post} user={user} />
            </BottomSheetModal>
        </View>
    );
};

export default SingleContentImage;