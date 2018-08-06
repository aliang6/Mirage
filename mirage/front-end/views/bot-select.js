import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default class BotSelectPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Select a trained bot</Text>
        <Button
          title="Friend 1"
          onPress={() => this.props.navigation.navigate('Chat')}
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
});