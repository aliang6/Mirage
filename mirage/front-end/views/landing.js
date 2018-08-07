import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Facebook } from 'expo';

var app_id = '';

async function fbLogin(app_id) {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(app_id, {
      permissions: ['public_profile'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
    Alert.alert(
      'Logged in!',
      `Hi ${(await response.json()).name}!`,
    );
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

  render() {
    return (
      <View style={styles.container}>
        <Text>Mirage</Text>
        <Text>{app_id}</Text>
        <Button
          title="Facebook Login"
          onPress={() => {
            retrieveAppId();
            fbLogin(); 
            // this.props.navigation.navigate('Options')
          }}
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