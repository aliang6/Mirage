import React from 'react';
import { 
  StyleSheet, 
  Image, 
  Text, 
  View 
} from 'react-native';
import { Font, Facebook } from 'expo';
import Button from 'react-native-button';

var app_id = '';
var access_token = '';
const background = require('../assets/img/art-artistic.jpg')

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
      'lato': require('../assets/fonts/lato/Lato-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <Image 
            style={styles.image}
            source={background}
            blurRadius={1}
          /> */}
          <View style={styles.overlay} />
        </View>
        <View style={styles.container}>
          <View style={styles.componentText}>
            {
              this.state.fontLoaded ? 
              <Text style={styles.landingText}>Mirage</Text> : null
            }
          </View>
          <View style={styles.componentButton}>
            {this.state.fontLoaded ? 
            <Button
              containerStyle={{ padding: 25, overflow:'hidden', borderRadius: 4, borderColor: 'rgba(46,204,50, 0.85)', backgroundColor: 'rgba(46,204,50, 0.4)'}}
              onPress={() => {
                // retrieveAppId();
                // fbLogin();
                this.props.navigation.navigate('Chat')
              }}
              style={styles.landingButtons}
            >
              Get Started
            </Button> : null}
            {/* <Button
              title="How it works"
              onPress={() => this.props.navigation.navigate('About')}
              styles={styles.landingButtons}
            /> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
     backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  componentText: {
    flex: 1,
    justifyContent: 'center',

  },
  componentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landingButtons: {
    fontSize: 27,
    //color: 'rgba(46,204,50, 0.85)',
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: 'raleway'
  },
  landingText: {
    fontFamily: 'raleway',
    fontSize: 100,
    color: 'rgba(255, 255, 255, 0.95)',
  }
});