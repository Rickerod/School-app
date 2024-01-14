import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import ProfileStudent from '../components/ProfileStudent';
import Header from '../components/Header';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
import BottomTabView  from '../navigators/BottomTabView'
import { apiUrl } from '../../constants';

export default function ProfileGuest({route}) {
    const [data, setData] = useState([])
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
            
            {/* {1 == 1 ? */}
            {route.params.type_user_profile == 1 ||  route.params.type_user_profile == 2?
                <SafeAreaView style={styles.container}>
                    <Header title={data[0].username} id={1} wd={0} />
                    <View style={{ width: '100%', padding: 10 }}>
                        <ProfileBody
                            id = {1}
                            id_user={route.params.id_user_profile}
                            name={data[0].username}
                            profileImage={data[0].uri_image_profile}
                            userDescription= {data[0].user_description}
                        />
                        <ProfileButtons
                            id={1} //Ver perfil como invitado
                            userDescription= {data[0].user_description}
                            accountName={data[0].username}
                            profileImage= {data[0].uri_image_profile}
                        />
                    </View>
                    <BottomTabView id = {1} type_user={route.params.type_user_profile} id_user={data[0].id_user}/>
                </SafeAreaView>
                :
                <View>
                    <ProfileStudent
                        id = {1}
                        username={data[0].username}
                        firsntame={data[0].firsntame}
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