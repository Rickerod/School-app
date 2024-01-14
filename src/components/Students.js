import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';

export default function Students() {
    const navigation = useNavigation();
    const [data, setData] = useState([])

    const user = useUser();

    //const apiUrl = process.env.HOST;

    useEffect(() => {
        const fetchUsers = async () => {
            const idSchool = 1
            const response = await fetch(`http://${apiUrl}/users/${idSchool}`)
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

    const getBorderColor = (idTypeUser) => {
        switch (idTypeUser) {
            case 1:
                return '#FB6B6B';
            case 2:
                return '#6361FC';
            default:
                return '#c13584';
        }
    };

    if (data == []) {
        return (
            <View>
            </View>
        );
    }

    return (
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            contentContainerStyle={{ 
                flexGrow: 1, // Esto asegura que el contenedor se expanda
                justifyContent: 'center', // Esto centra los elementos en el eje principal (horizontal)
                alignItems: 'center' // Esto centra los elementos en el eje cruzado (vertical)
            }}
            renderItem={({ item }) => {

                if (user.id_user == item.id_user) {
                    return (
                        <View></View>
                    );
                }

                console.log("type_user_profile", item.id_type_user)

                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ProfileGuest", {
                                id_user_profile: item.id_user,
                                type_user_profile: item.id_type_user
                            })}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingHorizontal: 8,
                            }}>
                            <View
                                style={{
                                    width: item.id_type_user === 0 ? 68 : 80,
                                    height: item.id_type_user === 0 ? 68 : 80,
                                    backgroundColor: 'white',
                                    borderWidth: 1.8,
                                    borderRadius: 100,
                                    borderColor: getBorderColor(item.id_type_user),
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
                );
            }
            }

        />
    );
}
