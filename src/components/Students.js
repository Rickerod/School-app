import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Students() {
    const navigation = useNavigation();
    
    const storyInfo = [
        {
            id: 1,
            name: 'Diterod',
            image: require('../storage/images/userProfile.png'),
        },
        {
            id: 0,
            name: 'Ram_Charan',
            image: require('../storage/images/profile1.jpg'),
        },
        {
            id: 0,
            name: 'Tom',
            image: require('../storage/images/profile2.jpg'),
        },
        {
            id: 0,
            name: 'The_Groot',
            image: require('../storage/images/profile3.jpg'),
        },
        ,
        {
            id: 0,
            name: 'loverland',
            image: require('../storage/images/profile4.jpg'),
        },
        ,
        {
            id: 0,
            name: 'chillhouse',
            image: require('../storage/images/profile5.jpg'),
        },
    ];

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 20, backgroundColor: 'white' }}>
            {storyInfo.map((data, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.navigate("ProfileStudent", {
                                uri_image: data.image,
                                name: data.name
                            })}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingHorizontal: 8,
                            }}>
                            <View
                                style={{
                                    width: 68,
                                    height: 68,
                                    backgroundColor: 'white',
                                    borderWidth: 1.8,
                                    borderRadius: 100,
                                    borderColor: '#c13584',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={data.image}
                                    style={{
                                        resizeMode: 'cover',
                                        width: '92%',
                                        height: '92%',
                                        borderRadius: 100,
                                        backgroundColor: 'orange',
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 10,
                                }}>
                                {data.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
