import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground, BackHandler, Pressable } from 'react-native';
//import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
    BottomSheetModalProvider,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import comments from '../storage/data/comments.json'
import ImageComments from './ImageComments';
import { useFocusEffect } from '@react-navigation/native';

const SingleContentImage = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const {uri_image, id_post, islike, num_likes} = route.params

    const commentsSheetRef = useRef(null);
    const [like, setLike] = useState(islike);
    const [count, setCount] = useState(num_likes)

    const [isShowing, setIsShowing] = useState(false);

    console.log("isShowing2", like)

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
        console.log('handleSheetChanges', index)
        if (index >= 0) {
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

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'yellow'
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
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                <Image
                    style={{
                        resizeMode: "cover", //cover
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        //backgroundColor: 'red'
                    }}
                    source={{uri: uri_image}}
                />
            </TouchableOpacity>
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