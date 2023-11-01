import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const ProfileBody = ({
    name,
    accountName,
    profileImage,
    post,
    followers,
    following,
}) => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 20,
                    paddingLeft: 20,
                }}>
                <View
                    style={{
                        alignItems: 'center',
                    }}>
                    <Image
                        source={profileImage}
                        style={{
                            resizeMode: 'cover',
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
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{post}</Text>
                    <Text>Publicaciones</Text>
                </View>
            </View>
        </View>
    );
};

export const ProfileButtons = ({ id, name, accountName, profileImage }) => {
    const navigation = useNavigation();
    const [follow, setFollow] = useState(follow);
    const [reported, setReported] = useState(true);
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
                                name: name,
                                accountName: accountName,
                                profileImage: profileImage,
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
                        justifyContent: 'space-evenly',
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
                                backgroundColor: follow ? null : '#3493D9',
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
                    <TouchableOpacity
                        onPress={() => setReported(!reported)}
                        style={{ width: '42%' }}>
                        <View
                            style={{
                                width: '100%',
                                height: 35,
                                borderRadius: 5,
                                backgroundColor: reported ? null : '#3493D9',
                                borderWidth: reported ? 1 : 0,
                                borderColor: '#DEDEDE',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: reported ? 'black' : 'white' }}>
                                {reported ? 'Reportar' : 'Reportado'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};