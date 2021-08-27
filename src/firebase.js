import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyCmbct_Z8dqZQzJKuSEXwY6TyGyFOVO0-s',
  authDomain: 'slack-clone-38573.firebaseapp.com',
  projectId: 'slack-clone-38573',
  storageBucket: 'slack-clone-38573.appspot.com',
  messagingSenderId: '744252596342',
  appId: '1:744252596342:web:59968ab98bcd3af1157f57',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
