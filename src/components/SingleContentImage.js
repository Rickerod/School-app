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

const SingleContentImage = ({ route, navigation }) => {
    const { likes, toggleLike } = useLike();
    const user = useUser()

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { uri_images, id_post, num_likes } = route.params

    const commentsSheetRef = useRef(null);
    const [comments, setComments] = useState("");

    const [isShowing, setIsShowing] = useState(false);

    const uri_image = uri_images[0].url_image

    const apiUrl = process.env.HOST;


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
                renderItem={({ item , index}) =>
                    <View style={{position: 'relative'}}>
                        <Image
                            source={{ uri: item.url_image }}
                            style={{
                                resizeMode: "contain",
                                width: windowWidth,
                                height: windowHeight,
                                alignSelf: 'center'

                            }}
                        />
                        {
                            uri_images.length > 1 &&
                            <View style={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: 'black',
                                borderRadius: 50,
                                padding: 5,
                                opacity: 0.8


                            }}>

                                <Text style={{ fontSize: 13, color: 'white' }}> {index + 1}/{uri_images.length} </Text>

                            </View>
                        }
                    </View>

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
                    toggleLike(id_post)
                    insertLike(!likes[id_post])
                }
                }
                    style={{ paddingTop: 5 }}>
                    <AntDesign
                        name={likes[id_post] ? 'heart' : 'hearto'}
                        style={{ color: likes[id_post] ? 'red' : 'black', fontSize: 25 }}
                    />
                </TouchableOpacity>
                <Text> {likes[id_post] ? num_likes + 1 : num_likes} </Text>
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
                <ImageComments id_post={id_post} />
            </BottomSheetModal>
        </View>
    );
};

export default SingleContentImage;