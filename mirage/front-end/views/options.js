import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default class OptionsPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Options</Text>
        <Button
          title="Train a Chatbot"
          onPress={() => this.props.navigation.navigate('FriendSelect')}
          styles={styles.landingButtons}
        />
        <Button
          title="Talk with a Trained Chatbot"
          onPress={() => this.props.navigation.navigate('BotSelect')}
          styles={styles.landingButtons}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  landingButtons: {

  }
});