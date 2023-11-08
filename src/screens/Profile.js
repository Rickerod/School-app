import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
import BottomTabView from '../components/BottomTabView'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header';

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <Header title="ditero_d" id={0}/>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
});

