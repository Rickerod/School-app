import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
//import Video from 'react-native-video';
//import vd from '../storage/videos/video1.mp4'
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Video, ResizeMode } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SingleContentImage({ route }) {
    const videoRef = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [like, setLike] = useState(false);

    //const {id_user} = route.params

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const searchData = [
        {
            id: 0,
            images: [
                require('../storage/videos/video4.mp4'),
                require('../storage/videos/video2.mp4'),
            ],
        },
        {
            id: 1,
            images: [
                require('../storage/images/post7.jpg'),
                require('../storage/images/post8.jpg'),
                require('../storage/images/post9.jpg'),
                require('../storage/images/post10.jpg'),
                require('../storage/images/post11.jpg'),
                require('../storage/images/post12.jpg'),
            ],
        },
        {
            id: 2,
            images: [
                require('../storage/images/post13.jpg'),
                require('../storage/images/post14.jpg'),
                require('../storage/images/post15.jpg'),
            ],
        },
    ];

    const isPlayingVideo = () => {
        if (status.isPlaying) videoRef.current.pauseAsync()
        else videoRef.current.playAsync()
        //setMute(!mute)
    }

    return (
        <SafeAreaView style={{flex : 1}}>
            <View style={{ flex: 1}}>
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
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                    />

                </TouchableOpacity>
                <View
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
                </View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: windowHeight / 6, //edited
                        right: 8,
                    }}>
                    <TouchableOpacity onPress={() => setLike(!like)} style={{ padding: 10 }}>
                        <AntDesign
                            name={like ? 'heart' : 'hearto'}
                            style={{ color: like ? 'red' : 'white', fontSize: 25 }}
                        />
                        <Text style={{ color: 'white' }}> 230 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Ionic
                            name="ios-chatbubble-outline"
                            style={{ color: 'white', fontSize: 25 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
