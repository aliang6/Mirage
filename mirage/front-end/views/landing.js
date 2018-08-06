import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export default class LandingPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Mirage</Text>
        <Text>{process.env.FB_APP_ID}</Text>
        <Button
          title="Facebook Login"
          onPress={() => this.props.navigation.navigate('Options')}
          styles={styles.landingButtons}
        />
        <Button
          title="How it works"
          onPress={() => this.props.navigation.navigate('About')}
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
    flex: 1,
    color: '#fff',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
});