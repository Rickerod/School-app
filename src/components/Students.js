import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

export default function Students() {
    const navigation = useNavigation();
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const idUsuario = 1
            const response = await fetch(`http://192.168.0.14:3000/students/${idUsuario}`)
            /* [
                {
                  "id_user": 2,
                  "uri_image_profile": "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile1.jpg",
                  "type_user": 0
                },
                {
                  "id_user": 3,
                  "uri_image_profile": "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile2.jpg",
                  "type_user": 0
                },...] */
            const dataResponse = await response.json();
            setData(dataResponse)
        }

        fetchUsers()
    }, [])


    if (data == []) {
        return <View></View>
    }

    console.log(data)

    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) =>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ProfileGuest", {
                            id_user_profile: item.id_user,
                            type_user_profile: item.type_user
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
                                source={{ uri: item.uri_image_profile }}
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
                            {item.firstname}
                        </Text>
                    </View>
                </TouchableOpacity>
            }

        />
    );
}
