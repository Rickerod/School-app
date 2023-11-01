import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScreenStack } from 'react-native-screens';
import BottomTabNavigator from './navigators/BottomTabNavigator'

import HolaMundo from './src/screens/HolaMundo';
import EditProfile from './src/components/EditProfile';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        creenOptions={{
          contentStyle: { backgroundColor: '#FFF' },
          headerBackVisible: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="TabScreen" component={BottomTabNavigator}
        />
        <Stack.Screen
          name="EditProfile" component={EditProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
