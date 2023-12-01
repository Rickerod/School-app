import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import useUser from '../hooks/useUser';

export default function LoginAuth() {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const navigation = useNavigation()
    


    const userData = (type_user) => {

        navigation.navigate("LoginStack", {
            id_user : 1,
            type_user: type_user
        })

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => userData(1)}>
            <View
                style={{
                    //backgroundColor: 'green',
                    width: windowHeight / 6,
                    height: windowHeight / 6,
                    borderWidth: 1.8,
                    borderRadius: 100,
                    borderColor: '#c13584',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/userProfile.png" }}
                        style={{
                            resizeMode: 'cover',
                            width: '95%',
                            height: '95%',
                            borderRadius: 100,
                            //backgroundColor: 'green',
                            alignSelf: 'center'
                        }}
                    />

            </View>
            </TouchableOpacity>
            <Text style={{ marginVertical: 10 }}> Administrador </Text>
            
            <TouchableOpacity onPress={() => userData(2)}>
            <View
                style={{
                    width: windowHeight / 6,
                    height: windowHeight / 6,
                    borderWidth: 1.8,
                    borderRadius: 100,
                    borderColor: '#c13584',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg" }}
                        style={{
                            resizeMode: 'cover',
                            width: '95%',
                            height: '95%',
                            borderRadius: 100,
                            //backgroundColor: 'green',
                            alignSelf: 'center'
                        }}
                    /> 
            </View>
            </TouchableOpacity >
            <Text style={{ marginVertical: 10 }}> Ministerio </Text>

            <TouchableOpacity onPress={() => userData(0)}>
                <View
                    style={{
                        //backgroundColor: 'green',
                        width: windowHeight / 6,
                        height: windowHeight / 6,
                        borderWidth: 1.8,
                        borderRadius: 100,
                        borderColor: '#c13584',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile5.jpg" }}
                        style={{
                            resizeMode: 'cover',
                            width: '95%',
                            height: '95%',
                            borderRadius: 100,
                            //backgroundColor: 'green',
                            alignSelf: 'center'
                        }}
                    />
                </View>
            </TouchableOpacity>
            <Text style={{ marginVertical: 10 }}> Usuario </Text>

        </View>
    );
}
