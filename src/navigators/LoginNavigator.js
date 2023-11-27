import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditProfile from '../components/EditProfile';
import SingleContentImage from '../components/SingleContentImage';
import SingleContentVideo from '../components/SingleContentVideo';
import ImageComments from '../components/ImageComments';
import ProfileStudent from '../components/ProfileStudent';
import Students from '../components/Students';
import ForoComments from '../components/ForoComments';
import EditPost from '../components/EditPost';

import HolaMundo from '../screens/HolaMundo';
import Register from '../screens/Register'

import BottomTabView from '../navigators/BottomTabView'
import BottomTabNavigator from './BottomTabNavigator'

import UserContext from '../context/UserContext';

export default function LoginNavigator({route}) {

    const Stack = createNativeStackNavigator();

    const userData = {
        id_user: route.params.id_user,
        type_user: route.params.type_user,
    } 
    return (
        <UserContext.Provider value={userData}>
            <Stack.Navigator
                screenOptions={{
                    contentStyle: { backgroundColor: '#FFF' },
                    headerShown: false,
                    headerMode: 'screen'
                }}
                initialRouteName="LoginHome"
            >
                <Stack.Screen
                    name="TabScreen" component={BottomTabNavigator}
                />
                <Stack.Screen
                    name="EditProfile" component={EditProfile}
                />

                <Stack.Screen
                    name="ProfileStudent" component={ProfileStudent}
                />

                <Stack.Screen
                    name="SingleContentImage" component={SingleContentImage}
                />
                <Stack.Screen
                    name="ImageComments" component={ImageComments}
                />
                <Stack.Screen
                    name="BottomTabView" component={BottomTabView}
                />

                <Stack.Screen
                    name="Students" component={Students}
                />
                <Stack.Screen
                    name="ForoComments" component={ForoComments}
                />
                <Stack.Screen
                    name="Register" component={Register}
                />
                <Stack.Screen
                    name="EditPost" component={EditPost}
                />
                {/* <Stack.Screen
                    name="ProfileHome" component={Profile}
                /> */}
            </Stack.Navigator>
        </UserContext.Provider>
    );
}
