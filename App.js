import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import LoginNavigator from './src/navigators/LoginNavigator';
import HolaMundo from './src/screens/HolaMundo';
import LoginAuth from './src/screens/LoginAuth';
import NewSurvey from './src/components/NewSurvey';
import SingleContentVideo from './src/components/SingleContentVideo';

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
              name="NewSurvey" component={NewSurvey}
            />   */}
             <Stack.Screen 
              name="LoginAuth" component={LoginAuth}
            />
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