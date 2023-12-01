import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
//import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Video, ResizeMode } from 'expo-av';

const SingleContentVideo = ({ }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const videoRef = useRef(null);
    const [status, setStatus] = React.useState({});

    

    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };

    //const [mute, setMute] = useState(false);

    const [like, setLike] = useState(false);

    const isPlayingVideo = () => {
        if(status.isPlaying) videoRef.current.pauseAsync()
        else videoRef.current.playAsync()
        //setMute(!mute)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black'
            }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={isPlayingVideo}
                style={{
                    width: '100%',
                    height: '100%',
                    //position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Video
                    ref={videoRef}
                    //source={require('../storage/videos/video4.mp4')}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                      }}
                    style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black' }}
                    //useNativeControls
                    isLooping
                    resizeMode={ResizeMode.CONTAIN} //Change contain 
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            </TouchableOpacity>

            <Ionic
                name="pause"
                style={{
                    fontSize: !mute ? 20 : 0,
                    color: 'white',
                    position: 'absolute',
                    backgroundColor: 'rgba(52,52,52,0.6)',
                    borderRadius: 100,
                    padding: !mute ? 20 : 0,
                }}
            />
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
    );
};

export default SingleContentVideo;