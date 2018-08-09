import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

/*var past_messages = '';

async function retrieveMessages() {
  await fetch('http://localhost:4000/api/past-messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({}),
  }).then((res) => {
    return res.json;
  }).then((json) => {
    past_messages = json;
  }).catch((err) => {
    console.log(err);
  });
} */

export default class ChatPage extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Echo Chamber',
  });

  state = {
    messages: [],
  };

  

  componentDidMount() {
    fetch('http://localhost:4000/api/past-messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({}),
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((json) => {
      this.setState({
        messages: json,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentWillMount() {
    /* this.setState({
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
    }) */
  }

  componentWillUnmount() {
    fetch('http://localhost:4000/api/save-messages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ messages: this.state.messages}),
    }).catch((err) => {
      console.log(err);
    });
  }

  get user() {
    return {
      name: this.props.navigation.getParam('name', 'User'),
      _id: Fire.shared.uid,
    }
  }

  onSend(messages = []) {
    const inputMessage = messages[0];
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    fetch('http://localhost:4000/api/ask', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message: inputMessage }),
    }).then((res) => {
      return res.json();
    }).then((json) =>{
      console.log(json);
      console.log(json.response);
      var message = {
        _id: this.state.messages.length,
        text: json.response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://www.ikea.com/PIAimages/0129203_PE283223_S5.JPG',
        },
      }
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    }).catch((err) => {
      console.log(err);
    });
    /* var response = messages[0].text;
    console.log(text); */
  }

  
  
  render() {
    return (
      <GiftedChat
        key={this.id}
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