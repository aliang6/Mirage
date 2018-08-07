import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

async function retrieveJSON() {
  console.log('Retrieving JSON');
  await fetch('http://localhost:4000/login', { 
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({}),
  }).then((res) => {
    console.log(res);
    return res.json();
  }).then((json) => {
    console.log(json);
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
        <Text>{process.env.FB_APP_ID}</Text>
        <Button
          title="Facebook Login"
          onPress={() => {
            retrieveJSON(); 
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