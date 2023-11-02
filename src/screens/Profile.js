import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { ProfileBody, ProfileButtons } from '../components/ProfileBody';
import BottomTabView from '../components/BottomTabView'

export default function Profile() {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', padding: 10 }}>
                <ProfileBody
                    name="Mr Peobody"
                    accountName="mr_peobody"
                    profileImage={require('../storage/images/userProfile.png')}
                    followers="3.6M"
                    following="35"
                    post="458"
                />
                <ProfileButtons
                    id={0}
                    name="Mr Peobody"
                    accountName="mr_peobody"
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

