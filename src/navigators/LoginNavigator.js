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
import CreateBitacora from '../components/CreateBitacora';
import BitacoraQuestions from '../components/BitatoraQuestions';
import NewSurvey from '../components/NewSurvey';
import BitacoraAnswers from '../screens/BitacoraAnswers';
import PostInfo from '../components/PostInfo';

import HolaMundo from '../screens/HolaMundo';
import Register from '../screens/Register'

import BottomTabView from '../navigators/BottomTabView'
import BottomTabNavigator from './BottomTabNavigator'

import UserContext from '../context/UserContext';
import { LikeProvider } from '../context/LikeContext';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { MenuProvider } from 'react-native-popup-menu';

export default function LoginNavigator({ route }) {

    const Stack = createNativeStackNavigator();

    const userData = {
        id_user: route.params.id_user,
        type_user: route.params.type_user,
        uri_image_profile: route.params.uri_image_profile,
        name: route.params.name
    }
    return (
        <UserContext.Provider value={userData}>
            <MenuProvider>
                <LikeProvider>
                    <Stack.Navigator
                        screenOptions={{
                            contentStyle: { backgroundColor: '#FFF' },
                            headerShown: false,
                            headerMode: 'screen'
                        }}
                        initialRouteName="LoginHome"
                    >

                        {/* <Stack.Screen
                            name="HolaMundo" component={HolaMundo}
                        /> */}
                        {/* <Stack.Screen
                            name="HolaMundo" component={HolaMundo}
                        /> */}
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
                            name="SingleContentVideo" component={SingleContentVideo}
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
                        <Stack.Screen
                            name="CreateBitacora" component={CreateBitacora}
                        />
                        <Stack.Screen
                            name="BitacoraQuestions" component={BitacoraQuestions}
                        />
                        <Stack.Screen
                            name="NewSurvey" component={NewSurvey}
                        />
                        <Stack.Screen
                            name="BitacoraAnswers" component={BitacoraAnswers}
                        />
                        <Stack.Screen 
                            name="PostInfo" component={PostInfo}
                        />
                        {/* <Stack.Screen
                    name="ProfileHome" component={Profile}
                /> */}
                    </Stack.Navigator>
                </LikeProvider>
            </MenuProvider>
        </UserContext.Provider>
    );
}
