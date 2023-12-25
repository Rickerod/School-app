import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
import BottomTabView from '../navigators/BottomTabView'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header';
import ProfileStudent from '../components/ProfileStudent';
import { apiUrl } from '../../constants';

export default function Profile({ route }) {
    const [data, setData] = useState([])

    //{id_user_profile, type_user_profile} = route.params
    //const apiUrl = process.env.HOST;

    useEffect(() => {
        const fetchData = async () => {
            //console.log(route.params['type_user_profile'])
            const response = await fetch(`http://${apiUrl}/users/profile/${route.params.id_user_profile}`)
            const dataResponse = await response.json();
            setData(dataResponse)
        }

        fetchData()
    }, [])

    if (data.length === 0) {
        return (
            <View></View>
        );
    }

    return (
        <View>
            {route.params.type_user_profile == 1 || route.params.type_user_profile == 2 ?
                <SafeAreaView style={styles.container}>
                    <Header title="ditero_d" id={0} wd={1} />
                    <View style={{ width: '100%', padding: 10 }}>
                        <ProfileBody
                            id={0} //Perfil del usuario
                            id_user={route.params.id_user_profile}
                            name={data[0].username}
                            profileImage={data[0].uri_image_profile}
                            userDescription={data[0].user_description}
                        />
                        <ProfileButtons
                            id={0} //Perfil del usuario
                            userDescription={data[0].user_description}
                            accountName={data[0].username}
                            profileImage={data[0].uri_image_profile}
                        />
                    </View>
                    <BottomTabView id={0} id_user={data[0].id_user} />
                </SafeAreaView>
                :
                <View>
                    <ProfileStudent
                        id={0}
                        username={data[0].username}
                        firsntame={data[0].firstname}
                        lastname={data[0].lastname}
                        uri_image_profile={data[0].uri_image_profile}
                        user_description={data[0].user_description}
                    />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
});

