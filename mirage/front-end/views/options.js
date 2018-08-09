import React from 'react';
import { 
  StyleSheet, 
  Button, 
  Text, 
  View } from 'react-native';

export default class OptionsPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Options</Text>
        <Button
          title="Find recipes with available ingredients"
          onPress={() => this.props.navigation.navigate('Ingredient')}
          styles={styles.landingButtons}
        />
        <Button
          title="Echo chamber"
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
  landingButtons: {

  }
});