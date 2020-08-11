import firebase from './Firebase';
import 'firebase/auth';

const auth = firebase.auth();

export const signInAdmin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

export const isSignedIn = () => {
  return auth.currentUser != null;
}