import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
//import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const SingleContentImage = ({uri_image}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const videoRef = useRef(null);

    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };


    const [like, setLike] = useState(false);

    return (
        <View
            style={{
                flex: 1, 
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: 'yellow'
            }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                }}>
                <Image
                    style={{
                        resizeMode:"stretch", //cover
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        //backgroundColor: 'red'
                    }}
                    source={uri_image}
                />
            </TouchableOpacity>
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

export default SingleContentImage;