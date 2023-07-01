/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import MUsic from './src/service.ts';

AppRegistry.registerComponent(appName,() => App);
TrackPlayer.registerPlaybackService(()=> MUsic)