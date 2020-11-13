/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from './App';
import Quiz from './Quiz';
const Stack = createStackNavigator();

class Driver extends Component{
    
    render(){
        return ( 
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">                
                    <Stack.Screen name="Home" component={App} />                    
                    <Stack.Screen name="Quiz" component={Quiz} />
                </Stack.Navigator>
            </NavigationContainer>
    );
  }
}
export default Driver;