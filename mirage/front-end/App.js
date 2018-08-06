import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LandingPage from './views/landing.js';
import OptionsPage from './views/options.js';
import FriendSelectPage from './views/friend-select.js';
import BotSelectPage from './views/bot-select.js';
import ChatPage from './views/chat.js';
import AboutPage from './views/about.js';


const nav = createStackNavigator({
  Landing: { screen: LandingPage },
  Options: { screen: OptionsPage },
  FriendSelect: { screen: FriendSelectPage },
  BotSelectPage: { screen: BotSelectPage },
  Chat: { screen: ChatPage },
  About: { screen: AboutPage },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>Test</Text>
      </View>
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
