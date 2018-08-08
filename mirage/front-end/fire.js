import Firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
  }

  init = () => {
    Firebase.initializeApp({
      
    })
  }
}

Fire.shared = new Fire();
export default Fire;