import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
//import Video from 'react-native-video';
//import vd from '../storage/videos/video1.mp4'
import { Video, ResizeMode } from 'expo-av';
import Octicons from 'react-native-vector-icons/Octicons';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';



export default function Videos({ route }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { id_user } = route.params

    const navigation = useNavigation()

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
    return (
        <FlatList
            key={'_'}
            data={searchData}
            numColumns={3}
            //horizontal={true}
            renderItem={({ item }) =>
                <TouchableOpacity
                    //key={imgIndex}
                    onPress={() => navigation.navigate('SingleContentVideo', {
                        id_post: item.id_post,
                        /* islike: item.is_liked, //Pasar estos parametros igualmente....
                        num_likes: item.num_likes */
                    })}
                    style={{ paddingBottom: 2, width: '33%' }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={item.thumbnailImage}
                            style={{ width: '100%', height: 150 }}
                        />
                        <View style={{ position: "absolute", top: 5, left: windowWidth / 3 - 30, right: 0 }}>
                            <Octicons
                                name="video"
                                style={{opacity: 0.8, fontSize: 18}}
                            />
                        </View>
                    </View>



                </TouchableOpacity>
            }
        />
    );
}
