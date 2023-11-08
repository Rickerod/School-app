import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, Pressable, TextInput, Dimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

export const ProfileBody = ({
    name,
    accountName,
    profileImage,
    post,
    followers,
    following,
}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View>
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                , paddingTop: 20,
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
                <View style={{ paddingRight: 40 }}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Octicons name="report" style={{ fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { width: windowWidth - windowWidth / 10, height: windowHeight - windowWidth / 0.5 }]}>
                            <Text style={styles.modalText}> ¿Porque quieres reportar? </Text>
                            <Text style={{ color: 'gray' }}> Tu reporte es anonimo. Si alguien se encuentra en peligro
                                inminente, llama a los servicios de emergencia locales. No esperes. </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Escribe aquí..."
                                multiline={true}
                                maxLength={200}
                                numberOfLines={4}
                            />
                            <Pressable
                                style={[styles.button]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}> Reportar </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
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
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'purple',
        width: '50%'
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
        width: 300, // Establece el ancho deseado aquí
        paddingBottom: 20,
        //height: 150, // Establece la altura deseada aquí
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10
    },
});

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

