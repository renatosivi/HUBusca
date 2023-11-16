import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/pages/Main';
import Profile from './src/pages/Profile';
import React from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='Profile' component={Profile}/>
      </Stack.Navigator>  
    </NavigationContainer>
  );
}