import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import ProfileStudent from '../components/ProfileStudent';
import Header from '../components/Header';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
import BottomTabView  from '../navigators/BottomTabView'

export default function ProfileGuest({route}) {
    const [data, setData] = useState([])
    const apiUrl = process.env.HOST;

    useEffect(() => {
        const fetchData = async () => {
            //console.log(route.params['type_user_profile'])
            const response = await fetch(`http://${apiUrl}/profile/${route.params.id_user_profile}`)
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
            {route.params.type_user_profile == 1 ?
                <SafeAreaView style={styles.container}>
                    <Header title={data[0].username} id={1} wd={0} />
                    <View style={{ width: '100%', padding: 10 }}>
                        <ProfileBody
                            id = {1}
                            id_user={route.params.id_user_profile}
                            name="Diterod"
                            profileImage={require('../storage/images/userProfile.png')}
                        />
                        <ProfileButtons
                            id={1} //Ver perfil como invitado
                            name="Diterod"
                            accountName="ditero_d"
                            profileImage={require('../storage/images/userProfile.png')}
                        />
                    </View>
                    <BottomTabView id = {1} id_user={data[0].id_user}/>
                </SafeAreaView>
                :
                <View>
                    <ProfileStudent
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