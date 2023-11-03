import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
//import Video from 'react-native-video';
//import vd from '../storage/videos/video1.mp4'
import { Video, ResizeMode } from 'expo-av';


export default function Videos() {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
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
    return (
        <ScrollView>
            {searchData.map((data, index) => {
                return (
                    <View key={index}>
                        {data.id === 0 ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    //justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                {data.images.map((videoData, videoIndex) => {
                                    return (
                                        <TouchableOpacity
                                            key={videoIndex}
                                            onPress={() => console.log("Hola")}
                                            style={{ paddingBottom: 2, width: '33%' }}>
                                            <Video
                                                ref={video}
                                                source={videoData}
                                                style={{ width: '100%', height: 150, backgroundColor: 'gray' }}
                                                useNativeControls
                                                resizeMode={ResizeMode.CONTAIN}
                                                onPlaybackStatusUpdate={status => setStatus(() => status)}
                                            />

                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ) : null}
                    </View>
                );
            })}
        </ScrollView>
    );
}
