import { registerRootComponent } from 'expo';
import App from './App';

// Native entry — must NOT import web-only CSS (RN Metro has no CSS loader).
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
registerRootComponent(App);
