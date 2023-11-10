import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScreenStack } from 'react-native-screens';
import BottomTabNavigator from './navigators/BottomTabNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import HolaMundo from './src/screens/HolaMundo';
import EditProfile from './src/components/EditProfile';
import SingleContentImage from './src/components/SingleContentImage';
import SingleContentVideo from './src/components/SingleContentVideo';
import ImageComments from './src/components/ImageComments';
import BottomTabView from './src/components/BottomTabView'
import ProfileStudent from './src/components/ProfileStudent';
import Students from './src/components/Students';
import ForoComments from './src/components/ForoComments';
import Header from './src/components/Header';
import Login from './src/screens/Login';
import Register from './src/screens/Register'

import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Stack.Navigator
            screenOptions={{
              title: "Hola",
              contentStyle: { backgroundColor: '#FFF' },
              headerShown: false,
              headerMode: 'screen'
            }}
            initialRouteName="Home"
          >
            {/* <Stack.Screen
              name="HolaMundo" component={HolaMundo}
            /> */}
            {/* <Stack.Screen
              name="SingleContentVideo" component={SingleContentVideo}
            /> */}
            {/* <Stack.Screen
              name="Login" component={Login}
            /> */}
            <Stack.Screen
              name="TabScreen" component={BottomTabNavigator}
            />
            <Stack.Screen
              name="EditProfile" component={EditProfile}
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
              name="ProfileStudent" component={ProfileStudent}
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
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
