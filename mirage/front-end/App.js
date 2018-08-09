import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LandingPage from './views/landing.js';
import OptionsPage from './views/options.js';
import IngredientPage from './views/ingredients.js';
import NamePage from './views/name.js';
import ChatPage from './views/chat.js';
import AboutPage from './views/about.js';

const RootStack = createStackNavigator(
  {
    Landing: { screen: LandingPage },
    Options: { screen: OptionsPage },
    Ingredient: { screen: IngredientPage },
    Name: { screen: NamePage },
    Chat: { screen: ChatPage },
    About: { screen: AboutPage },
  },
  {
    initialRouteName: 'Landing',
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
