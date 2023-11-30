import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, Button, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';

export default function NewSurvey() {
    const [text, setText] = useState("")
    const [opciones, setOpciones] = useState([""]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    console.log(opciones)
    const agregarOpcion = () => {
        if (opciones.length < 10) {
            setOpciones(prev => [...prev, ""])
        }
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Header title="Encuesta" id={1} wd={0} />
            <ScrollView style={{padding: 20}}>
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
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{}}> Permitir varias respuestas </Text>
                    <Switch
                        style={{}}
                        trackColor={{ false: '#767577', true: '#C389FF' }}
                        thumbColor={isEnabled ? 'purple' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />

                </View>
                <View style={{ paddingBottom: 20 }}>
                    <Button borderRadius={20} paddingBottom={10} title="Crear encuesta" color="purple" />
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
