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
import LoginNavigator from './navigators/LoginNavigator';
import HolaMundo2 from './src/components/HolaMundo2';

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
            
            {/*  <Stack.Screen
              name="HolaMundo2" component={HolaMundo2}
            />  */}
            {/* <Stack.Screen
              name="Login" component={Login}
            /> */}

            <Stack.Screen
               name="LoginStack" component={LoginNavigator}
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
