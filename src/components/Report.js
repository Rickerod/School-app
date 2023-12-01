import React, {useState} from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';

import useUser from '../hooks/useUser';

export default function Report({modalVisible, fModalVisible}) {

    const user = useUser()
    const apiUrl = process.env.HOST;
    const [text, setText] = useState('');

    //Insertar reporte
    const sendReport = async () => {
        const body = { report_description: text };

        const response = await fetch(`http://${apiUrl}/report/${user.id_user}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.ok) {
            fModalVisible(!modalVisible)
        } else {
            console.log(data.message, data.err)
        }
    }

    const handleTextChange = enteredText => {
        setText(enteredText);
    }

    return (
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
                    fModalVisible(!modalVisible);
                }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: '#F5F5F5',
                        borderRadius: 20,
                        padding: 35,
                    }}>
                        <Text style={{
                            marginBottom: 15,
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}> ¿Porque quieres reportar? </Text>
                        <Text style={{ color: 'gray' }}> Tu reporte es anonimo. Si alguien se encuentra en peligro
                            inminente, llama a los servicios de emergencia locales. No esperes. </Text>
                        <TextInput
                            style={{
                                paddingBottom: 20,
                                borderWidth: 0.5,
                                borderColor: 'gray',
                                borderRadius: 5,
                                paddingHorizontal: 10,
                                marginVertical: 10,
                            }}
                            placeholder="Escribe aquí..."
                            multiline={true}
                            maxLength={200}
                            numberOfLines={4}
                            onChangeText={handleTextChange}
                            value={text}
                        />
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
                                    onPress={() => fModalVisible(!modalVisible)}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}> CANCELAR </Text>
                                </Pressable>
                                <Pressable
                                    style={{
                                        borderRadius: 20,
                                        padding: 10,
                                        backgroundColor: 'purple',
                                        alignSelf: 'center'
                                    }}
                                    onPress={sendReport}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}> REPORTAR </Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
}
