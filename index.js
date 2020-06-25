/**
 * @format
 */

import 'node-libs-react-native/globals';
import 'crypto';

import './src/globals';
import './src/shim.js';

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
