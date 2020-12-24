/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/main';

const Stack = createStackNavigator();

const StackScreens = () =>{
  return (
        <Stack.Navigator initialRouteName="Main"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      );
  };

const Routes = () => {
  return (
    <NavigationContainer>
      <StackScreens />
    </NavigationContainer>
  );
};




 // eslint-disable-next-line eol-last
 export default Routes;