import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';
import { useLike } from '../context/LikeContext';

export default function Posts({ route, navigation }) {
    const [data, setData] = useState([])
    const { id_user } = route.params

    const windowWidth = Dimensions.get('window').width;

    const user = useUser()
    const { likes, numlikes, addNumLikes, addLikes } = useLike()
    //const apiUrl = process.env.HOST;

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://${apiUrl}/profile/post/${id_user}/${user.id_user}`) //(userProfile, id_user)
            const dataResponse = await response.json();

            //console.log(dataResponse)
             const likes = dataResponse.reduce((result, post) => {
                result[post.id_post] = post.is_liked;
                return result;
            }, {});

            const numLikes = dataResponse.reduce((result, post) => {
                result[post.id_post] = post.num_likes;
                return result;
            }, {});

            
            addLikes(likes)
            addNumLikes(numLikes)
            setData(dataResponse)
        }

        fetchPost()

    }, [])

    //console.log(data)

    if (data == []) {
        return <View></View>
    }

    return (
        <FlatList
            key={'_'}
            data={data}
            numColumns={3}
            //horizontal={true}
            contentcontainerstyle={{ justifyContent: 'space-between', alignItems: 'space-between', flexdirection: 'row', flexwrap: 'wrap' }}
            renderItem={({ item }) =>
                <TouchableOpacity
                    //key={imgIndex}
                    onPress={() => navigation.navigate('SingleContentImage', {
                        uri_images: item.images,
                        id_post: item.id_post,
                        islike: item.is_liked,
                        num_likes: item.num_likes
                    })}
                    style={{ paddingBottom: 2, width: '33%' }}>

                    {item.images.length <= 1 ?
                        <Image
                            source={{ uri: item.images[0].url_image }}
                            style={{ width: '100%', height: 150 }}
                        /> :
                        <View style= {{ flex : 1 }}>
                            <Image
                                source={{ uri: item.images[0].url_image }}
                                style={{ width: '100%', height: 150 }}
                            />
                            <View style= {{position: "absolute", top: 5, left: windowWidth/3 - 30, right: 0}}>
                                <Ionicons
                                    size={20}
                                    style={{opacity: 0.9}}
                                    name='images'
                                />
                            </View>
                        </View>

                    }


                </TouchableOpacity>
            }
        />
    );
}
