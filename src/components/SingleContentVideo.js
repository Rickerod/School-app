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
import { useLike } from '../context/LikeContext';
import useUser from '../hooks/useUser';
import { apiUrl } from '../../constants';

import {
    BottomSheetModal,
} from "@gorhom/bottom-sheet";


export default function SingleContentImage({ route }) {
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const navigation = useNavigation()

    const commentsSheetRef = React.useRef(null);
    const [isShowing, setIsShowing] = useState(false);

    const { likes, toggleLike, toggleNumLikes } = useLike();
    const {uri_video, id_post, islike, num_likes} = route.params
    
    const [is_like, setLike] = useState(islike)
    const [numLikes, setNumLikes] = useState(num_likes)
    //Dummy variables
    //const id_post = 1

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const user = useUser()
    
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
                            uri: uri_video,
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
                    <TouchableOpacity onPress={() => {
                        insertLike(!is_like)
                        setLike((prev) => !prev)
                        if (likes[id_post] !== undefined) {
                            toggleLike(id_post)
                            toggleNumLikes(id_post, !is_like)
                        }
                        
                    }} 
                        
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
                <ImageComments id_post={id_post} user={user}/>
            </BottomSheetModal>
        </SafeAreaView>
    );
}
