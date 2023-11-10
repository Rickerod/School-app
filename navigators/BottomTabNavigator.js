import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

import Profile from '../src/screens/Profile'
import HomeScreen from '../src/screens/HomeScreen';
import Post from '../src/components/Post';

import { getHeaderTitle } from '@react-navigation/elements';

export default function TabNavigator() {

    const Tab = createBottomTabNavigator();

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
                    }


                    return <Ionicons name={iconName} size={size} color={colour} />;
                },
            })}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}

            />
            {/*<Tab.Screen
                name="Post"
                component={Post}
        />*/}
            <Tab.Screen name="person" component={Profile} />
        </Tab.Navigator>
    )
}
