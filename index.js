/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import FirebasePushNotificationService from './src/services/firebase/FCM';

FirebasePushNotificationService.createNotificationListeners()

AppRegistry.registerComponent(appName, () => App);
