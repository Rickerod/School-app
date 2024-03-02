import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
//import Video from 'react-native-video';
//import vd from '../storage/videos/video1.mp4'
import { Video, ResizeMode } from 'expo-av';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';



export default function Videos({ route }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [data, setData] = useState([])

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { id_user } = route.params

    const user = useUser()

    const navigation = useNavigation()

    useEffect(() => {

        const fetchPost = async () => {

            const type_post = "video"

            const response = await fetch(`http://${apiUrl}/posts/profile/${type_post}/${id_user}/${user.id_user}`)

            const dataResponse = await response.json();
            setData(dataResponse)
        }

        fetchPost()

    }, [])

    const searchData = [
        {
            id_post: 1,
            thumbnailImage: require('../storage/images/post7.jpg'),
        },
        {
            id_post: 2,
            thumbnailImage: require('../storage/images/post6.jpg'),
        },
        {
            id_post: 3,
            thumbnailImage: require('../storage/images/post5.jpg'),
        },
        {
            id_post: 4,
            thumbnailImage: require('../storage/images/post4.jpg'),
        },
        {
            id_post: 5,
            thumbnailImage: require('../storage/images/post3.jpg'),
        }
    ];

    if (data == []) {
        return <View></View>
    }

    return (
        <FlatList
            key={'_'}
            data={data}
            numColumns={3}
            //horizontal={true}
            renderItem={({ item }) =>
                <TouchableOpacity
                    //key={imgIndex}
                    onPress={() => navigation.navigate('SingleContentVideo', {
                        uri_video: item.video_url,
                        id_post: item.id_post,
                        islike: item.is_liked,
                        num_likes: item.num_likes,
                        uri_image_profile: item.uri_image_profile,
                        username: item.username,
                        description: item.post_description
                    })}
                    style={{ paddingBottom: 2, width: '33%' }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={{ uri: item.thumbnail_video }}
                            style={{ width: '100%', height: 150 }}
                        />
                        <View style={{ position: "absolute", top: 5, left: windowWidth / 3 - 30, right: 0 }}>
                            <Octicons
                                name="video"
                                color="white"
                                style={{ opacity: 0.8, fontSize: 18 }}
                            />
                        </View>
                    </View>



                </TouchableOpacity>
            }
        />
    );
}
