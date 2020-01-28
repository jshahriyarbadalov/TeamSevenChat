/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import WelcomeScreen from './Screens/WelcomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import ChatScreen from './Screens/MainScreen';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";



const AppNavigator = createStackNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  LoginScreen: { screen: LoginScreen },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      header: null
    }
  },
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#38006B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>

    );
  }
}
