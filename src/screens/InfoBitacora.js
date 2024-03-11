import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import infoBitacora from '../storage/data/infoBitacora.json'
import Header from '../components/Header';
import { apiUrl } from '../../constants';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import useUser from '../hooks/useUser';


const BitacoraInfoItem = ({ data }) => {

    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <TouchableOpacity onPress={() => navigation.navigate("BitacoraAnswers", {
                name: data.name_bitacora,
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
                            source={{uri: data.uri_image_profile}}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                {data.name_bitacora}
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

export default function InfoBitacora() {

    const [data, setData] = useState([])
    const user = useUser();

    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                const response = await fetch(`http://${apiUrl}/bitacora/bitacora/${user.school_id}`)
                const dataResponse = await response.json();
    
                setData(dataResponse)
            }
    
            fetchData()
        }, []) // Incluye todas las dependencias aquí
    );

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Bitacoras" id={0} wd={0} />
            <Text style={{ fontSize: 21, fontWeight: 600, alignSelf: 'center' }}> Bitacoras realizadas </Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <BitacoraInfoItem data={item} />}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    );
}
