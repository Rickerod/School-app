import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
import BottomTabView from '../components/BottomTabView'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Fontisto from '@expo/vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Profile() {
    return (
        <View style={styles.container}>
            {/* ----Header ----*/}
            <SafeAreaView
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingTop: 15,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        //fontFamily: 'Amita',
                        fontSize: 20,
                        fontWeight: '500',
                    }}>
                    ditero_d
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => console.log("Click on bell...")}   
                    >
                        <Fontisto name="bell" style={{ fontSize: 24 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => console.log("Click on cog...")}   
                    >
                    <Entypo name="cog" style={{ fontSize: 24, paddingLeft: 20 }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {/* ----Header ----*/}
            <View style={{ width: '100%', padding: 10 }}>
                <ProfileBody
                    name="Diterod"
                    accountName="ditero_d"
                    profileImage={require('../storage/images/userProfile.png')}
                    followers="3.6M"
                    following="35"
                    post="458"
                />
                <ProfileButtons
                    id={1}
                    name="Diterod"
                    accountName="ditero_d"
                    profileImage={require('../storage/images/userProfile.png')}
                />
            </View>
            <BottomTabView />
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

