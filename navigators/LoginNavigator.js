import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HolaMundo from '../src/screens/HolaMundo';
import EditProfile from '../src/components/EditProfile';
import SingleContentImage from '../src/components/SingleContentImage';
import SingleContentVideo from '../src/components/SingleContentVideo';
import ImageComments from '../src/components/ImageComments';
import BottomTabView from '../src/components/BottomTabView'
import ProfileStudent from '../src/components/ProfileStudent';
import Students from '../src/components/Students';
import ForoComments from '../src/components/ForoComments';
import Header from '../src/components/Header';
import Register from '../src/screens/Register'
import EditPost from '../src/components/EditPost';
import BottomTabNavigator from './BottomTabNavigator'
import UserContext from '../src/context/UserContext';
import Profile from '../src/screens/Profile';

export default function LoginNavigator() {

    const Stack = createNativeStackNavigator();

    const userData = {
        id_user: 1,
        type_user: 1,
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
{/*                 <Stack.Screen
                    name="ProfileHome" component={Profile}
                /> */}
            </Stack.Navigator>
        </UserContext.Provider>
    );
}
