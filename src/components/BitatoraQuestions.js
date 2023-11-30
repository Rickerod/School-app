import React, { useState } from 'react';
import { View, Text, Dimensions, Image, TextInput, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { ScrollView } from 'react-native-gesture-handler';

import Header from './Header';

export default function BitacoraQuestions({ route }) {
    const [value, setValue] = useState(5);
    const [valueNota, setValueNota] = useState(4);
    const [text, setText] = useState('');
    const [textLearn, setTextLearn] = useState('');

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { title } = route.params

    const emojis = [
        "😡",
        "😨",
        "🙁",
        "😐",
        "🙂",
        "😁",
        "🥰"
    ];
    
    return (
        <View style={{ flex: 1 }}>
            <Header title="Bitacora" id={1} wd={0} />
            <ScrollView additionalOffset={30} style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 500, paddingTop: 20 }}> {title}</Text>
                <Text style={{ fontSize: 15, fontWeight: 400, paddingVertical: 20, }}>
                    ¿Con que nivel de energía te iras de la clase?
                </Text>
                <Slider
                    style={{ width: windowWidth - 40, height: 40 }}
                    minimumValue={1}
                    maximumValue={7}
                    step={1}
                    value={value}
                    onValueChange={setValue}
                    minimumTrackTintColor="#C389FF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#C389FF"
                />
                <View style={{ flexDirection: "row", paddingHorizontal: 5, justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 20 }}>{emojis[0]}</Text>
                    <Text style={{ fontSize: 20 }}>{emojis[1]}</Text>
                    <Text style={{ fontSize: 20 }}>{emojis[2]}</Text>
                    <Text style={{ fontSize: 20 }}>{emojis[3]}</Text>
                    <Text style={{ fontSize: 20 }}>{emojis[4]}</Text>
                    <Text style={{ fontSize: 20 }}>{emojis[5]}</Text>
                    <Text style={{ fontSize: 20 }}>{emojis[6]}</Text>
                </View>

                <Text style={{ fontSize: 15, fontWeight: 400, paddingVertical: 20, }}>
                    ¿Que nota le pondrias a esta actividad?
                </Text>
                <Slider
                    style={{ width: windowWidth - 40, height: 40 }}
                    minimumValue={1}
                    maximumValue={7}
                    step={1}
                    value={valueNota}
                    onValueChange={setValueNota}
                    minimumTrackTintColor="#C389FF"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#C389FF"
                />

                <View style={{ flexDirection: "row", paddingHorizontal: 12, justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 15 }}>1</Text>
                    <Text style={{ fontSize: 15 }}>2</Text>
                    <Text style={{ fontSize: 15 }}>3</Text>
                    <Text style={{ fontSize: 15 }}>4</Text>
                    <Text style={{ fontSize: 15 }}>5</Text>
                    <Text style={{ fontSize: 15 }}>6</Text>
                    <Text style={{ fontSize: 15 }}>7</Text>
                </View>


                <Text style={{ fontSize: 15, fontWeight: 400, paddingVertical: 20, }}>
                    ¿Como te vas de la clase?, menciona una emoción de la imagen
                </Text>
                <Image
                    source={require("../storage/images/emotions.jpg")}
                    style={{
                        resizeMode: "contain",
                        width: windowWidth - 40,
                        height: 250

                    }}
                />
                <TextInput
                    style={{
                        width: windowWidth - 40,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        marginVertical: 20,
                    }}
                    placeholder="Escribe aquí tu emoción..."
                    maxLength={200}
                    onChangeText={(enteredText) => setText(enteredText)}
                    value={text}
                />
                <Text style={{ fontSize: 15, fontWeight: 400, paddingVertical: 20, }}>
                    ¿Que aprendiste de la clase de hoy? Comparte una reflexión personal
                </Text>

                <TextInput
                    style={{
                        width: windowWidth - 40,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        marginVertical: 20,
                        borderWidth: 0.5,
                    }}
                    placeholder="Escribe aquí tu aprendizaje de la clase..."
                    maxLength={200}
                    numberOfLines={4}
                    onChangeText={(enteredText) => setTextLearn(enteredText)}
                    value={textLearn}
                />
                <View style={{ paddingBottom: 20 }}>
                    <Button borderRadius={20} paddingBottom={10} title="Enviar" color="purple" />
                </View>
            </ScrollView>
        </View>
    );
}
