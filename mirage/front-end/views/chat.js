import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../fire';
export default class ChatPage extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Chat',
  });

  state = {
    messages: [],
  };

  componentDidMount() {
    console.log(this.props.navigation.getParam('name', 'User'));
    Fire.shared.on((message) => {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
  }

  componentWillUnmount() {
    Fire.shared.off();
  }

  get user() {
    return {
      name: this.props.navigation.getParam('name', 'User'),
      _id: Fire.shared.uid,
    }
  }

  
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={{
          name: this.props.navigation.getParam('name', 'User'),
          _id: Fire.shared.uid,
        }}
      />
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