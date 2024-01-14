import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, Button, Switch, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiUrl } from '../../constants';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser';

export default function NewSurvey() {
    const [text, setText] = useState("")
    const [opciones, setOpciones] = useState([""]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    console.log(opciones)
    const navigation = useNavigation()
    const user = useUser();

    const insertSurvey = async () => {

        var sendOptions = opciones
        console.log("text", text)
        console.log("opciones", opciones.length)
        if (text.length != "" && opciones.length > 2) {

            if (opciones.length < 10) {
                sendOptions = sendOptions.slice(0, -1)
                console.log(sendOptions)
            }

            const body = {
                pregunta: text,
                alternatives: sendOptions
            }

            try {

                const response = await fetch(`http://${apiUrl}/survey/insertSurvey/${user.id_user}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                const data = await response.json();

                //navigation.goBack()

            } catch (e) {
                console.log("ERROR: ", e)
            } finally {
                Alert.alert("¡Encuenta creada!")
                navigation.goBack()
            }
        } else {
            if(text == ""){
                Alert.alert("Se debe ingresar una pregunta")
            }else{
                Alert.alert("Se debe ingresar más de 2 opciones")
            }
        }

    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Encuesta" id={1} wd={0} />
            <ScrollView style={{ padding: 20 }}>
                <Text style={{ paddingTop: 40, fontWeight: 500 }}> Pregunta </Text>
                {/* Pregunta */}
                <TextInput
                    style={{
                        width: windowWidth - 40,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD',
                        marginVertical: 20,
                    }}
                    placeholder="Escribe tu pregunta..."
                    maxLength={200}
                    multiline={true}
                    onChangeText={(enteredText) => setText(enteredText)}
                    value={text}
                />
                {/* Opciones */}
                <Text style={{ paddingTop: 40, fontWeight: 500 }}> Opciones </Text>
                {opciones.map((value, index) => (
                    <View key={index}>
                        <TextInput
                            value={value}
                            style={{
                                marginLeft: 20,
                                width: windowWidth - 60,
                                borderBottomWidth: 1,
                                borderColor: '#CDCDCD',
                                marginVertical: 20,
                            }}
                            onChangeText={text => {
                                const tempOpciones = [...opciones];
                                if (tempOpciones[index] === "" && text !== "" && opciones.length < 10) {
                                    tempOpciones[index] = text;
                                    setOpciones(tempOpciones);
                                    setOpciones(prev => [...prev, ""])
                                } else if (tempOpciones[index] !== "" && text === "" && index !== 9) {
                                    const spliceArray = tempOpciones.filter((v, i) => i != index)
                                    console.log(spliceArray)
                                    setOpciones(spliceArray);
                                } else {
                                    tempOpciones[index] = text
                                    setOpciones(tempOpciones);
                                }
                            }}
                            placeholder="+ Añadir..."
                            maxLength={200}
                            multiline={true}
                        />
                    </View>
                ))}
                <View style={{ paddingBottom: 20 }}>
                    <Button borderRadius={20} paddingBottom={10} onPress={insertSurvey} title="Crear encuesta" color="purple" />
                </View>

                {/* <Button
                title="Agregar opción"
                onPress={agregarOpcion}
                disabled={opciones.length === 10}
            /> */}
            </ScrollView>
        </SafeAreaView>
    );
}
