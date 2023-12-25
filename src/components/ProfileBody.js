import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable, TextInput, Dimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Report from './Report';
import { apiUrl } from '../../constants';

export const ProfileBody = ({
    id,
    id_user,
    name,
    profileImage,
    userDescription
}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [data, setData] = useState([])
    const [text, setText] = useState('');

    //const apiUrl = process.env.HOST;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://${apiUrl}/users/profile/numPosts/${id_user}`)
            const dataResponse = await response.json();
            setData(dataResponse)
        }

        fetchData()
    }, [])

    //console.log(data)

    if (data.length === 0) {
        return (
            <View></View>
        );
    }

    return (
        <View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20,
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{uri: profileImage}}
                            style={{
                                resizeMode: 'contain',
                                width: 80,
                                height: 80,
                                borderRadius: 100,
                            }}
                        />
                        <Text
                            style={{
                                paddingVertical: 5,
                                fontWeight: 'bold',
                            }}>
                            {name}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{data[0].num_posts}</Text>
                        <Text>Publicaciones</Text>
                    </View>
                </View>
                {id == 1 &&
                    <View style={{flex: 1, flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Ionicons name="megaphone" style={{ fontSize: 30 }} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View style={{ width: windowWidth / 1.5 }}>
                <Text> {userDescription} </Text>
            </View>
            
            <Report modalVisible={modalVisible} fModalVisible={setModalVisible}/>
        </View >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        //shadowOpacity: 0.25,
        //shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'purple',
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    textInput: {
        paddingBottom: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: 'red'
    },
});

export const ProfileButtons = ({ id, userDescription, accountName, profileImage }) => {
    const navigation = useNavigation();
    const [follow, setFollow] = useState(follow);

    return (
        <>
            {id === 0 ? (
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingVertical: 5,
                    }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.push('EditProfile', {
                                accountName: accountName,
                                profileImage: profileImage,
                                userDescription: userDescription
                            })
                        }
                        style={{
                            width: '100%',
                        }}>
                        <View
                            style={{
                                width: '100%',
                                height: 35,
                                borderRadius: 5,
                                borderColor: '#DEDEDE',
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    letterSpacing: 1,
                                    opacity: 0.8,
                                }}>
                                Edit Profile
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => setFollow(!follow)}
                        style={{ width: '42%' }}>
                        <View
                            style={{
                                width: '100%',
                                height: 35,
                                borderRadius: 5,
                                backgroundColor: follow ? null : 'purple',
                                borderWidth: follow ? 1 : 0,
                                borderColor: '#DEDEDE',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: follow ? 'black' : 'white' }}>
                                {follow ? 'Siguiendo' : 'Seguir'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

