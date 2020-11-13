/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'; 
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer,} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home/Home';
import Quiz from './Quiz/Quiz';

const App = () =>{
	const Stack = createStackNavigator();
  return(		
      <NavigationContainer>				
      	<Stack.Navigator initialRouteName="Home">                
        	<Stack.Screen name="Home" component={Home} />                    
        	<Stack.Screen name="Quiz" component={Quiz} />
      	</Stack.Navigator>				
    	</NavigationContainer>  				
  );
}
  
export default App;
