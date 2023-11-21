import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useUser from '../hooks/useUser';

export default function Posts({ route, navigation }) {
    const [data, setData] = useState([])
    const {id_user} = route.params

    const user = useUser()

    useEffect(() => {

        const fetchPost = async () => {
            const response = await fetch(`http://192.168.0.14:3000/profile/post/${user.id_user}/${id_user}`) //(userProfile, id_user)
            const dataResponse = await response.json();
            setData(dataResponse)
        }

        fetchPost()

    }, [])
    
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
                        uri_image: item.images[0].url_image,
                        id_post: item.id_post,
                        islike: item.is_liked,
                        num_likes: item.num_likes
                    })}
                    style={{ paddingBottom: 2, width: '33%' }}>
                    <Image
                        source={{ uri: item.images[0].url_image }}
                        style={{ width: '100%', height: 150 }}
                    />
                </TouchableOpacity>
            }
        />
    );
}
