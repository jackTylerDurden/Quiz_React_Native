/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Driver from './Driver';
import {name as appName} from './app.json';

export default function Main() {
    return (
      <NavigationContainer>
        <PaperProvider>
          <Driver />
        </PaperProvider>
      </NavigationContainer>
    );
  }

AppRegistry.registerComponent(appName, () => Driver);
