import React, {useState, useRef, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity,  BackHandler} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import ImageComments from './ImageComments';
import comments from '../storage/data/comments.json';

import {
    BottomSheetModal,
} from "@gorhom/bottom-sheet";

export default function PostInfo({data}) {
    const commentsSheetRef = useRef(null);
    const [like, setLike] = useState(data.is_liked);
    const [isShowing, setIsShowing] = useState(false);

    const navigation = useNavigation();

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

    const sendComment = async () => {
        console.log("Enviando comentario...")
    };
    
    return (
        <View
            //key={index}
            style={{
                paddingBottom: 10,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.1,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 15,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{uri: data.uri_image_profile}}
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                    <View style={{ paddingLeft: 5 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {data.username}
                        </Text>
                    </View>
                </View>
                <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SingleContentImage', {
                uri_image: data.images[0].url_image,
                id_post: data.id_post,
                islike: like,
                num_likes: like ? data.num_likes + 1 : data.num_likes
            })}>
                <View
                    style={{
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{uri: data.images[0].url_image}}
                        style={{ width: '100%', height: 400 }}
                    />
                </View>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setLike(!like)}>
                        <AntDesign
                            name={like ? 'heart' : 'hearto'}
                            style={{
                                paddingRight: 10,
                                fontSize: 20,
                                color: like ? 'red' : 'black',
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openComments}>
                        <Ionic
                            name="ios-chatbubble-outline"
                            style={{ fontSize: 20, paddingRight: 10 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="navigation" style={{ fontSize: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text>
                    Le gusta a {like ? data.num_likes + 1 : data.num_likes} personas más
                </Text>
                <Text
                    style={{
                        fontWeight: '700',
                        fontSize: 14,
                        paddingVertical: 2,
                    }}>
                    {data.post_description}
                </Text>
                <TouchableOpacity onPress={() => commentsSheetRef.current?.present()}>
                    <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                        Ver los comentarios
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomSheetModal
                ref={commentsSheetRef}
                snapPoints={["100%"]}
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
}
