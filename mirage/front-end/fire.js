import Firebase from 'firebase';

class Fire {
  constructor() {
    this.init();

    this.observeAuth();
  }

  init = () => {
    Firebase.initializeApp({
      apiKey: "AIzaSyBCziZ7HNfhWrUhHcntYVRCw8afTnr88Bg",
      authDomain: "mirage-b777b.firebaseapp.com",
      databaseURL: "https://mirage-b777b.firebaseio.com",
      projectId: "mirage-b777b",
      storageBucket: "mirage-b777b.appspot.com",
      messagingSenderId: "486144542315"
    });
  }

  observeAuth = () => {
    Firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged= (user) => {
    if(!user) {
      try {
        Firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  }

  get ref() {
    return Firebase.database().ref('messages');
  }

  on = (callback) => {
    this.ref
      .limitToLast(20)
      .on('child_added', (snapshot) => {
        callback(this.parse(snapshot));
      });
  }

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val;
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  }

  get uid() {
    return (Firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Firebase.database.ServerValue.TIMESTAMP;
  }

  send = (messages) => {
    for(let i = 0; i < messages.length; i += 1) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  }

  append = (message) => {
    this.ref.push(message);
  }

  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;