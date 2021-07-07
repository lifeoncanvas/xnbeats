import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC-tiIcAF-gZ7XEF62O1D18KaSyCMsG2Oc",
    authDomain: "xnbeats-7f338.firebaseapp.com",
    projectId: "xnbeats-7f338",
    storageBucket: "xnbeats-7f338.appspot.com",
    messagingSenderId: "556366489315",
    appId: "1:556366489315:web:f537f296031f9e088fc7d6",
    measurementId: "G-E21DESFV9D"
  }

const fBaseApp = firebase.initializeApp(config);

// DB
export const DB = fBaseApp.firestore();
export const { Timestamp } = firebase.firestore;
export const usersCollection = DB.collection('users');
export const reviewsCollection = DB.collection('reviews');
