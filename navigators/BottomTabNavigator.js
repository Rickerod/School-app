import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Profile from '../src/screens/Profile'
import HomeScreen from '../src/screens/HomeScreen';
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
                    } else if (route.name === 'Reels') {
                        iconName = focused
                            ? 'caret-forward-circle'
                            : 'caret-forward-circle-outline';
                    } else if (route.name === 'Activity') {
                        iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={colour} />;
                },
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="person" component={Profile} />
        </Tab.Navigator>
    )
}
