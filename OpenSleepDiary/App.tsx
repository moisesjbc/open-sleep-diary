import 'react-native-gesture-handler';
import React from 'react';
import SleepEntry from './views/SleepEntry';
import Home from './views/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sleep entry" component={SleepEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}