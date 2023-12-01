import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, BackHandler } from 'react-native';
//import Video from 'react-native-video';
//import vd from '../storage/videos/video1.mp4'
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageComments from './ImageComments';
import { useNavigation } from '@react-navigation/native';

import {
    BottomSheetModal,
} from "@gorhom/bottom-sheet";


export default function SingleContentImage({ route }) {
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [like, setLike] = useState(false);
    const navigation = useNavigation()

    const commentsSheetRef = React.useRef(null);
    const [isShowing, setIsShowing] = useState(false);

    const {id_post} = route.params

    //Dummy variables
    //const id_post = 1

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const isPlayingVideo = () => {
        if (status.isPlaying) videoRef.current.pauseAsync()
        else videoRef.current.playAsync()
        //setMute(!mute)
    }

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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                        Video
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={isPlayingVideo}
                    style={{ flex: 1 }}>
                    <Video
                        ref={videoRef}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        style={{ position: 'absolute', width: '100%', height: "100%" }}
                        //useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />

                </TouchableOpacity>
                {/* <View
                    style={{
                        position: 'absolute',
                        alignSelf: 'flex-start',
                        //width: windowWidth,
                        //zIndex: 1,
                        bottom: 0, //edited
                        padding: 10,
                    }}>
                    <View style={{}}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Ionic
                                name="ios-musical-note"
                                style={{ color: 'white', fontSize: 16 }}
                            />
                            <Text style={{ color: 'white' }}>Original Audio</Text>
                        </View>
                    </View>
                </View> */}
                <View
                    style={{
                        position: 'absolute',
                        bottom: windowHeight / 6, //edited
                        right: 8,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => setLike(!like)} style={{ paddingTop: 5 }}>
                        <AntDesign
                            name={like ? 'heart' : 'hearto'}
                            style={{ color: like ? 'red' : 'black', fontSize: 25 }}
                        />
                    </TouchableOpacity>
                    <Text> 230 </Text>
                    <TouchableOpacity onPress={openComments} style={{ padding: 10 }}>
                        <Ionic
                            name="ios-chatbubble-outline"
                            style={{fontSize: 25 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
        </SafeAreaView>
    );
}
