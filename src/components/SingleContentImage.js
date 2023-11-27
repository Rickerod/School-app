import React, { useRef, useState, useEffect, useCallback } from 'react';
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

const SingleContentImage = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { uri_images, id_post, islike, num_likes } = route.params

    const commentsSheetRef = useRef(null);
    const [like, setLike] = useState(islike);
    const [count, setCount] = useState(num_likes)
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

    //Cargar comentarios al post
    const loadComments = async () => {
        try {
            const response = await axios.get(`http://${apiUrl}/comments/${id_post}`);
            setComments(response.data)

        } catch (error) {
            console.log("Error", error);
        }
    }

    const handleSheetChanges = (index) => {
        //console.log('handleSheetChanges', index)
        if (index >= 0) {
            loadComments()
            setIsShowing(true)
            
        } else {
            setIsShowing(false)
        }
    }

    const handleClickLike = () => {
        setLike(!like)
        if (like) {
            setCount((prev) => prev - 1)
        } else {
            setCount((prev) => prev + 1)
        }
    }

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
        }]

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
                    <Ionic name="arrow-back" style={{ fontSize: 25, color: 'white', paddingRight: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
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
                renderItem={({ item }) =>
                    <View>
                        <Image
                            source={{uri: item.url_image}}
                            style={{
                                resizeMode: "cover",
                                width: windowWidth,
                                height: windowHeight

                            }}
                        />
                    </View>

                }
                pagingEnabled
            />

            <View
                style={{
                    position: 'absolute',
                    bottom: windowHeight / 6, //edited
                    right: 8,
                }}>
                <TouchableOpacity onPress={handleClickLike} style={{ padding: 10 }}>
                    <AntDesign
                        name={like ? 'heart' : 'hearto'}
                        style={{ color: like ? 'red' : 'white', fontSize: 25 }}
                    />
                    <Text style={{ color: 'white' }}> {count} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openComments} style={{ padding: 10 }}>
                    <Ionic
                        name="ios-chatbubble-outline"
                        style={{ color: 'white', fontSize: 25 }}
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
                <ImageComments comments={comments} />
            </BottomSheetModal>
        </View>
    );
};

export default SingleContentImage;