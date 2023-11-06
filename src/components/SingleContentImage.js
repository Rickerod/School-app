import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
//import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
    BottomSheetModalProvider,
    BottomSheetModal,
} from "@gorhom/bottom-sheet";
import comments from '../storage/data/comments.json'
import ImageComments from './ImageComments';

const SingleContentImage = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const commentsSheetRef = useRef(null);

    const videoRef = useRef(null);

    const openComments = () => {
        commentsSheetRef.current?.present();
    };

    const onBuffer = buffer => {
        console.log('buffring', buffer);
    };
    const onError = error => {
        console.log('error', error);
    };


    const [like, setLike] = useState(false);
    const [count, setCount] = useState(230)

    const handleClickLike = () => {
        setLike(!like)
        if(like){
            setCount( (prev) => prev - 1)
        } else{
            setCount( (prev) => prev + 1)
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
                    source={route.params.uri_image}
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
            {/*} All comments */}
            <BottomSheetModal
                ref={commentsSheetRef}
                snapPoints={["70%"]}
                index={0}
                backgroundComponent={({ style }) => (
                    <View style={[style, { backgroundColor: "#fff"}]} />
                )}
            >
                <ImageComments comments={comments} />
            </BottomSheetModal>
        </View>
    );
};

export default SingleContentImage;