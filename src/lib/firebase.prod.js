import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCFM6Y4h5u3p2dfE_YYJcKJRU7s3k3rm-4',
  authDomain: 'diversity-b4701.firebaseapp.com',
  databaseURL: 'https://diversity-b4701.firebaseio.com',
  projectId: 'diversity-b4701',
  storageBucket: 'diversity-b4701.appspot.com',
  messagingSenderId: '692215933215',
  appId: '1:692215933215:web:7889ec17c15e36a78b282a'
};

const firebase = Firebase.initializeApp(config);
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };
export const auth = firebase.auth()
