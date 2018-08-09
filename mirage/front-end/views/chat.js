import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
export default class ChatPage extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Echo Chamber',
  });

  state = {
    messages: [],
  };

  componentDidMount() {
    /*console.log(this.props.navigation.getParam('name', 'User'));
    Fire.shared.on((message) => {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    }); */ 
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello friend',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://www.ikea.com/PIAimages/0129203_PE283223_S5.JPG',
          },
        },
      ]
    })
  }

  componentWillUnmount() {
    // Fire.shared.off();
  }

  get user() {
    return {
      name: this.props.navigation.getParam('name', 'User'),
      _id: Fire.shared.uid,
    }
  }

  onSend(messages = []) {
    console.log(messages);
    /* var response = messages[0].text;
    console.log(text); */
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    var message = {
      _id: this.state.messages.length - 1,
      text: 'I love you',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://www.ikea.com/PIAimages/0129203_PE283223_S5.JPG',
      },
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
  }

  
  
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => {
          this.onSend(messages);
        }}
        user={{
          _id: 1,
          name: 'User',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        }}
        createdAt={new Date()}
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