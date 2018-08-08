import React from 'react';
import { 
  StyleSheet, 
  Button, 
  Text, 
  TextInput,
  TouchableOpacity,
  View } from 'react-native';

export default class NamePage extends React.Component {
  state = {
    name: '',
  }

  onChangeText = (name) => {
    this.setState({
      name: name,
    })
  }

  onPress = () => {
    this.props.navigation.navigate('Chat', {name: this.state.name})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter your name</Text>
        <Text>{this.state.name}</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="First, Last"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.nameBtn}>Next</Text>
        </TouchableOpacity>
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