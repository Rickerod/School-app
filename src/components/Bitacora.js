import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler';
import bitacora from '../storage/data/bitacora.json'
import Feather from 'react-native-vector-icons/Feather';
import { apiUrl } from '../../constants';
import useUser from '../hooks/useUser';
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation } from '@react-navigation/native';

const BitacoraItem = ({ data }) => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            {!data.made_bitacora ?
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("BitacoraQuestions", {
                        title: data.name_bitacora,
                        id_bitacora: data.id_bitacora
                    })}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginVertical: 20,
                                marginHorizontal: 10,
                            }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: data.uri_image_profile }}
                                    style={{ width: 40, height: 40, borderRadius: 100 }}
                                />
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {data.name_bitacora}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.2, 
                    marginVertical: 20, marginHorizontal: 10}}>
                        <Image
                            source={{ uri: data.uri_image_profile }}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                Encuesta {data.id_bitacora}: {data.name_bitacora}
                            </Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>
                                oct. 05
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            justifyContent: 'center'
                        }}
                    >
                        <Feather
                            name="check-circle"
                            size={50}
                            style = {{alignSelf: 'center'}}
                            color="green"
                        />
                    </View>

                </View>
            }
        </View>
    );

}

const renderSeparator = () => (
    <View
        style={{
            backgroundColor: '#E3E3E3',
            height: 1,
        }}
    />
);

export default function Bitacora({ route }) {

    const { id, id_user } = route.params
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [update, setUpdate] = useState(false)

    const user = useUser()

    /* useEffect(() => {

        async function fetchData() {

            const response = await fetch(`http://${apiUrl}/bitacora/${user.id_user}`)
            const dataResponse = await response.json();

            console.log(dataResponse)
            setData(dataResponse)

        }

        fetchData()
    }, []) */

    useFocusEffect(
        React.useCallback(() => {
          // Coloca aquí la lógica que deseas ejecutar al obtener el foco nuevamente
          // Puede ser la recarga de datos, etc.
    
          // Puedes ejecutar tu lógica de carga de datos nuevamente si es necesario
          async function fetchData(){
            const response = await fetch(`http://${apiUrl}/bitacora/users/${user.id_user}/${id_user}`) //(user, ProfileUserAdmin)
            const dataResponse = await response.json();
            setData(dataResponse)
        }
    
        fetchData();

        }, [update])
      );

    const actions = [
        {
            text: 'Bitacora',
            icon: <Ionicons name="create" size={20} color="white" />,
            name: 'action2',
            position: 1,
        },
    ];

    const onPressAction = (name) => {
        setModalVisible(true)
    };

    const sendBitacora = async () => {
        const body = {
            titulo: title
        }

        const response = await fetch(`http://${apiUrl}/bitacora/${user.id_user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        setModalVisible(!modalVisible)
        setUpdate(!update)
    }

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* Contenido principal de tu componente */}
            {/* Botón flotante */}
            <FlatList
                data={data}
                renderItem={({ item }) => <BitacoraItem data={item}> </BitacoraItem>}
                ItemSeparatorComponent={renderSeparator}
            />
            {id === 0 &&
                <FloatingAction
                    actions={actions}
                    onPressItem={(name) => onPressAction(name)}
                    floatingIcon={<Ionicons name="add" size={30} color="white" />}
                    color="purple" // Color del botón flotante
                    overlayColor="rgba(255, 255, 255, 0.8)" // Color del fondo cuando se presiona el botón flotante
                />
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    //marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        width: '80%',
                        padding: 35,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}> Nombre de la bitácora: </Text>
                        <TextInput
                            placeholder="Ingresa el nombre..."
                            value={title}
                            style={{
                                fontSize: 15,
                                marginVertical: 20,
                                borderBottomWidth: 1,
                                alignSelf: "flex-start",
                                borderColor: '#CDCDCD',
                            }}
                            onChangeText={text => setTitle(text)}
                        />

                        <Pressable
                            style={{
                                borderRadius: 20,
                                padding: 10,
                                backgroundColor: 'purple',
                                alignSelf: 'center'
                            }}
                            onPress={sendBitacora}>
                            <Text style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white'
                            }}> SUBIR BITÁCORA </Text>

                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    );
}
