import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Font, Facebook } from 'expo';

var app_id = '';
var access_token = '';

async function fbLogin(app_id) {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(app_id, {
      permissions: ['public_profile', 'user_friends'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    console.log('Logged in!');
    console.log(`Hi ${(await response.json()).name}!`);
    console.log(token);
    await fetch('http://localhost:4000/token', {
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({ access_token: token }),
    }).then(() => {
      console.log('Sent');
    }).catch((err) => {
      console.log(err);
    })
    //this.props.navigation.navigate('Options');
  }
}

async function retrieveAppId() {
  console.log('Retrieving JSON');
  await fetch('http://localhost:4000/login', { 
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({}),
  }).then((res) => {
    console.log(res);
    return res.json();
  }).then((json) => {
    app_id = json.app_id;
    console.log(app_id);
    fbLogin(app_id);
  }).catch((err) => {
    console.log(err);
  });
}



export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.report = '';
  }

  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'raleway': require('../assets/fonts/raleway/Raleway-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.componentText}>
          {
            this.state.fontLoaded ? 
            <Text style={styles.landingText}>Mirage</Text> : null
          }
        </View>
        <View style={styles.componentButton}>
          <Button
            title="Get Started"
            onPress={() => {
              // retrieveAppId();
              // fbLogin();
              this.props.navigation.navigate('Options')
            }}
            style={styles.landingButtons}
          />
          {/* <Button
            title="How it works"
            onPress={() => this.props.navigation.navigate('About')}
            styles={styles.landingButtons}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  componentText: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'powderblue',
  },
  componentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  landingButtons: {
    fontSize: 36,
  },
  landingText: {
    fontFamily: 'raleway',
    fontSize: 72,
  }
});