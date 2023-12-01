import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FloatingAction } from "react-native-floating-action"
import { Ionicons } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler';
import bitacora from '../storage/data/bitacora.json'
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

const BitacoraItem = ({ data }) => {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <TouchableOpacity onPress={() => navigation.navigate("BitacoraQuestions", {
                title: data.name
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
                            source={require('../storage/images/userProfile.png')}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {data.name}
                            </Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>
                                oct. 05
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
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

    console.log("Bitacora id", id)

    const actions = [
        {
            text: 'Bitacora',
            icon: <Ionicons name="create" size={20} color="white" />,
            name: 'action2',
            position: 1,
        },
    ];

    const onPressAction = (name) => {
        console.log(`Botón presionado: ${name}`);
        // Aquí puedes implementar la lógica asociada a cada botón
    };

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* Contenido principal de tu componente */}
            {/* Botón flotante */}
            <FlatList
                data={bitacora}
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
        </View>
    );
}
