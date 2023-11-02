import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
//import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const SingleReel = ({uri_image}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const videoRef = useRef(null);

    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };

    const [mute, setMute] = useState(false);

    const [like, setLike] = useState(false);

    return (
        <View
            style={{
                width: windowWidth,
                height: windowHeight,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setMute(!mute)}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                <ImageBackground
                    style={{
                        //resizeMode:"cover",
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                    source={uri_image}
                />
            </TouchableOpacity>
            <Ionic
                name="volume-mute"
                style={{
                    fontSize: mute ? 20 : 0,
                    color: 'white',
                    position: 'absolute',
                    backgroundColor: 'rgba(52,52,52,0.6)',
                    borderRadius: 100,
                    padding: mute ? 20 : 0,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    width: windowWidth,
                    zIndex: 1,
                    bottom: 0, //edited
                    padding: 10,
                }}>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: windowHeight/6, //edited
                    right: 8,
                }}>
                <TouchableOpacity onPress={() => setLike(!like)} style={{ padding: 10 }}>
                    <AntDesign
                        name={like ? 'heart' : 'hearto'}
                        style={{ color: like ? 'red' : 'white', fontSize: 25 }}
                    />
                    <Text style={{ color: 'white' }}>230</Text>
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

export default SingleReel;