import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

export default function Posts({navigation}) {
    const searchData = [
        {
            id: 0,
            images: [
                require('../storage/images/post1.jpg'),
                require('../storage/images/post2.jpg'),
                require('../storage/images/post7.jpg'),
                require('../storage/images/post4.jpg'),
                require('../storage/images/post5.jpg'),
                require('../storage/images/post6.jpg'),
                require('../storage/images/post7.jpg'),
                require('../storage/images/post8.jpg'),
                require('../storage/images/post9.jpg'),
                require('../storage/images/post10.jpg'),
                require('../storage/images/post11.jpg'),
                require('../storage/images/post12.jpg'),
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
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }}>
                                {data.images.map((imageData, imgIndex) => {
                                    return (
                                        <TouchableOpacity
                                            key={imgIndex}
                                            onPress={() => navigation.push('Reels', {
                                                uri_image : imageData
                                            })}
                                            style={{ paddingBottom: 2, width: '33%' }}>
                                            <Image
                                                source={imageData}
                                                style={{ width: '100%', height: 150 }}
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
