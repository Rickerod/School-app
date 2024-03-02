import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, Modal, Pressable } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';


export default function Header({ title, id, wd }) {
    const navigation = useNavigation();
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [modalVisible, setModalVisible] = useState(false);
    const [enableComments, setEnableComments] = useState(0)

    const user = useUser()


    useEffect(() => {

        const fetchData = async () => {

            const response = await fetch(`http://${apiUrl}/disableComments`)
            const dataResponse = await response.json();

            setEnableComments(dataResponse[0].show_comments)


        }

        fetchData()

    }, [])

    const commentsDisable = async (enable) => {
        try {
            const response = await fetch(`http://${apiUrl}/disableComments/${enable}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

        } catch (error) {
            console.error("ERROR", error);
        } finally {
            setEnableComments(!enableComments)
            setModalVisible(false)
        }


    }

    return (
        <View backgroundColor={"white"}>
            <StatusBar
                backgroundColor={"white"}
                barStyle="dark-content"
                animated={true}
            />
            <SafeAreaView
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 15,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>
                {/*<FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />*/}
                <View style={{ flexDirection: 'row', paddingLeft: 5 }}>
                    {id !== 0 ?
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
                            <Ionic name="arrow-back" style={{ fontSize: 25, color: 'white', paddingRight: 20 }} />
                        </TouchableOpacity>
                        : null}
                    <Text
                        style={{
                            //fontFamily: 'Cochin',
                            fontSize: 20,
                            fontWeight: '500',
                            color: id !== 0 ? "white" : undefined
                        }}>
                        {title}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {wd === 1 &&
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => navigation.navigate("Post")}
                            >
                                <Feather name="plus-square" style={{ fontSize: 28, borderRadius: 30 }} />
                            </TouchableOpacity>
                            {user.type_user === 1 &&
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <MaterialCommunityIcons name="chat-remove-outline" style={{ fontSize: 28, paddingLeft: 20, borderRadius: 30 }} />
                                </TouchableOpacity>
                            }
                        </View>
                    }
                    <TouchableOpacity
                        activeOpacity={0.5}
                    >
                        <Fontisto name="bell" style={{ fontSize: 24, paddingLeft: 20, color: id !== 0 ? "white" : undefined }} />
                    </TouchableOpacity>
                    <Menu>
                        <MenuTrigger>
                            <Entypo name="cog" style={{ fontSize: 24, paddingLeft: 20, color: id !== 0 ? "white" : undefined }} />
                        </MenuTrigger>
                        <MenuOptions style={{ padding: 10 }}>
                            <MenuOption onSelect={() =>
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Login" }],
                                })} >
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="exit-to-app" style={{ fontSize: 20, paddingRight: 5 }}></MaterialCommunityIcons>
                                    <Text style={{ fontSize: 16 }}> Cerrar sesión </Text>
                                </View>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
            </SafeAreaView>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
            }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false)
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{
                            margin: 20,
                            backgroundColor: '#F5F5F5',
                            borderRadius: 20,
                            padding: 35,
                        }}>
                            {enableComments == 1 ?
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}> ¿Estás seguro que deseas deshabilitar los comentarios? </Text>
                                :
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}> ¿Habilitar los comentarios nuevamente? </Text>
                            }
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Pressable
                                        style={{
                                            borderRadius: 20,
                                            padding: 10,
                                            backgroundColor: 'gray',
                                            alignSelf: 'center',
                                            marginRight: 20,
                                        }}
                                        onPress={() => setModalVisible(false)}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: 'white'
                                        }}> CANCELAR </Text>
                                    </Pressable>

                                    {enableComments == 1 ?
                                        <Pressable
                                            style={{
                                                borderRadius: 20,
                                                padding: 10,
                                                backgroundColor: 'red',
                                                alignSelf: 'center'
                                            }}
                                            onPress={() => commentsDisable(0)}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white'
                                            }}> DESHABILITAR COMENTARIOS </Text>
                                        </Pressable>
                                        :
                                        <Pressable
                                            style={{
                                                borderRadius: 20,
                                                padding: 10,
                                                backgroundColor: 'purple',
                                                alignSelf: 'center'
                                            }}
                                            onPress={() => commentsDisable(1)}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color: 'white'
                                            }}> HABILITAR COMENTARIOS </Text>
                                        </Pressable>

                                    }
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
