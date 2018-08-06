import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class FriendSelectPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Select a friend to impersonate</Text>
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