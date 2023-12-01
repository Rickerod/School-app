import React, { useTransition } from 'react';
import { View, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionic from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';

import Posts from '../components/Posts';
import Videos from '../components/Videos';
import Foro from '../components/Foro'
import Survey from '../components/Survey';
import Bitacora from '../components/Bitacora';
import useUser from '../hooks/useUser';

const BottomTabView = ({id, id_user}) => {
  const Tab = createMaterialTopTabNavigator();

  const user = useUser()

  console.log("type_user", user.type_user)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Video') {
            iconName = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Survey') {
            iconName = focused ? 'graph' : 'graph';
            colour = focused ? 'black' : 'gray';
            return <Octicons name={iconName} color={colour} size={22} />
          } else if (route.name === 'Bitacora') {
            iconName = focused ? 'clipboard-pencil' : 'clipboard-pencil';
            colour = focused ? 'black' : 'gray';

            return <Foundation name={iconName} color={colour} size={22} />
          } else if (route.name === 'Foro') {
            iconName = focused ? 'megaphone' : 'megaphone-outline';
            colour = focused ? 'black' : 'gray';
          }
          

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}>
      <Tab.Screen name="Posts" component={Posts} initialParams={{id_user: id_user}} />
      <Tab.Screen name="Video" component={Videos} initialParams={{id_user: id_user}}/>
      <Tab.Screen name="Survey" component={Survey} initialParams={{id: id, id_user: id_user}}/>

      {
        user.type_user === 1 &&
        <Tab.Screen name="Bitacora" component={Bitacora} initialParams={{id: id, id_user: id_user}}/>
      }
      {/* <Tab.Screen name="Foro" component={Foro} initialParams={{id_user: id_user}}/> */}
    </Tab.Navigator>
  );
};

export default BottomTabView;