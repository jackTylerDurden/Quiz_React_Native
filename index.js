/**
 * @format
 */


import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

export default function Main() {
  return (    
      <PaperProvider>
        <App />
      </PaperProvider>    
  );
}

AppRegistry.registerComponent(appName, () => App);
