import firebase from 'firebase/compat/app';
import 'firebase/auth'
import 'firebase/database'


const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  // databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '483043061216',
  appId: '1:483043061216:web:0715df11a27d409d094f85',
  measurementId: 'G-R9QD4GM2JV'
}

// const config = {
//   apiKey: "AIzaSyCRcYIb-XSar4mQ2t1OvOeAIa1l5XtyU1c",
//   authDomain: "beeenergy-2e966.firebaseapp.com",
//   projectId: "beeenergy-2e966",
//   storageBucket: "beeenergy-2e966.appspot.com",
//   messagingSenderId: "483043061216",
//   appId: "1:483043061216:web:0715df11a27d409d094f85",
//   measurementId: "G-R9QD4GM2JV"
// };

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}

initFirebase()

export { firebase }
