import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { apiUrl } from '../../constants';

export default function LoginAuth() {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const navigation = useNavigation()
    
    const userData = (id_user, type_user, uri_image_profile, name) => {

        navigation.navigate("LoginStack", {
            id_user : id_user,
            type_user: type_user,
            uri_image_profile: uri_image_profile,
            name: name
        })

    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => userData(1, 1, "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/userProfile.png", "jhondoe")}>
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
            
            <TouchableOpacity onPress={() => userData(4, 2, "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg", "janedoe4")}>
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

            <TouchableOpacity onPress={() => userData(3, 0, "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile5.jpg", "rabbit")}>
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
