import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

import Profile from '../screens/Profile'
import HomeScreen from '../screens/HomeScreen';
import NewPost from '../components/NewPost';
import ProfileGuest from '../screens/ProfileGuest';
import ProfileStudent from '../components/ProfileStudent';
import ScreenReport from '../screens/ScreenReports';
import InfoBitacora from '../screens/InfoBitacora';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useUser from '../hooks/useUser'
import { useNavigation } from '@react-navigation/native';


const HomeStack = () => {
    const HomeStack = createNativeStackNavigator()

    return (
        <HomeStack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: '#FFF' },
                headerShown: false,
                headerMode: 'screen'
            }}
        >

            <HomeStack.Screen
                name="HomeStack" component={HomeScreen}
            />
            <HomeStack.Screen
                name="ProfileStudent" component={ProfileStudent}
            />
            <HomeStack.Screen
                name="ProfileGuest" component={ProfileGuest}
            />

        </HomeStack.Navigator>
    )
}


export default function TabNavigator() {

    const Tab = createBottomTabNavigator();
    const user = useUser()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    height: 50,
                },

                tabBarIcon: ({ focused, size, colour }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                        size = focused ? size + 8 : size + 2;
                    } else if (route.name === 'person') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === "Post") {
                        return <Feather name="plus-square" size={size} color={colour} />;
                    } else if (route.name === "Report") {
                        iconName = focused ? 'megaphone' : 'megaphone-outline';
                        colour = focused ? 'black' : 'gray';
                    } else if (route.name === "InfoBitacora") {
                        iconName = focused ? 'clipboard-pencil' : 'clipboard-pencil';
                        colour = focused ? 'black' : 'gray';

                        return <Foundation name={iconName} color={colour} size={22} />
                    }


                    return <Ionicons name={iconName} size={size} color={colour} />;
                },
            })}>
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{ title: 'Inicio' }}
            />

            {(user.type_user == 1 || user.type_user == 2) &&
                <Tab.Screen
                    name="Post"
                    component={NewPost}

                />
            }
            <Tab.Screen
                name="person"
                component={Profile}
                initialParams={{ id_user_profile: user.id_user, type_user_profile: user.type_user }}
            />

            {user.type_user == 1 &&
                <Tab.Screen
                    name="Report"
                    component={ScreenReport}
                />
            }

            {user.type_user == 1 &&
                <Tab.Screen
                    name="InfoBitacora"
                    component={InfoBitacora}
                />
            }
        </Tab.Navigator>
    )
}
