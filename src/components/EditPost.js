import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, Pressable, ToastAndroid, TouchableOpacity } from 'react-native';
import Header from './Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Ionic from 'react-native-vector-icons/Ionicons';

export default function EditPost() {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const navigation = useNavigation()


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Imagen', value: 'imagen' },
        { label: 'Video', value: 'video' },
        { label: 'Encuesta', value: 'encuesta' },
        { label: 'Pizarra', value: 'pizarra' },
    ]);
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionic name="close-outline" style={{ fontSize: 35 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Editar publicación</Text>
                <TouchableOpacity
                    onPress={() => {navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabScreen' }],
                    })
                    ToastAndroid.show('Publicación realizada!', ToastAndroid.SHORT);
                    }} >
                    <Ionic name="checkmark" style={{ fontSize: 35, color: 'purple' }} />
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: 14,
                fontWeight: 600,
                marginVertical: 8,
                marginLeft: 5
            }}> Descripción </Text>
            <TextInput
                //style={styles.textInput}
                style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginHorizontal: 5, paddingHorizontal: 10 }}
                placeholder="Escribe aquí..."
                multiline={true}
                maxLength={200}
                numberOfLines={12}
            />
            <Text style={{
                fontSize: 14,
                fontWeight: 500,
                marginTop: 30,
                marginLeft: 5
            }}> Categoria </Text>
            <View style={{ padding: 5 }}>
                <DropDownPicker
                    style={{ borderColor: 'gray', alignSelf: 'center', borderRadius: 5, textColor: 'gray' }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder='Selecciona una categoria'
                    placeholderStyle={{color: 'gray'}}
                    selectedTextStyle={{
                        fontSize: 16,
                        color: '#525151'
                    }}
                />
                {/* <Pressable
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'TabScreen' }],
                        })
                        ToastAndroid.show('Publicación realizada!', ToastAndroid.SHORT);
                    }}
                    style={{
                        borderRadius: 20,
                        padding: 10,
                        elevation: 2,
                        backgroundColor: 'purple',
                        width: '50%',
                        marginVertical: 20,
                        alignSelf: 'center',

                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white'
                    }}> Publicar </Text>
                </Pressable> */}
            </View>


        </View>
    );
}
