/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'

messaging().setBackgroundMessageHandler(async remoteMessage => [
    console.log('Background handler message: ', remoteMessage.notification)
])

AppRegistry.registerComponent(appName, () => App);
