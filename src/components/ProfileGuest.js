import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import ProfileStudent from './ProfileStudent';
import Header from './Header';
import { ProfileBody, ProfileButtons } from './ProfileBody';
import BottomTabView from '../components/BottomTabView'

export default function ProfileGuest({route}) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            //console.log(route.params['type_user_profile'])
            const response = await fetch(`http://192.168.0.14:3000/profile/${route.params.id_user_profile}`)
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
                    <Header title="ditero_d" id={0} wd={1} />
                    <View style={{ width: '100%', padding: 10 }}>
                        <ProfileBody
                            id_user={route.params.id_user_profile}
                            name="Diterod"
                            profileImage={require('../storage/images/userProfile.png')}
                        />
                        <ProfileButtons
                            id={1} //Ver perfir como invitado
                            name="Diterod"
                            accountName="ditero_d"
                            profileImage={require('../storage/images/userProfile.png')}
                        />
                    </View>
                    <BottomTabView id_user={data[0].id_user}/>
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