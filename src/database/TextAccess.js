import firebase from './Firebase';
import 'firebase/database';

const db = firebase.database();

const aboutRef = db.ref('/about');

export const putAbout = async (aboutText) => {
  return aboutRef.set(aboutText);
}

export const getAbout = async () => {
  const about = (await aboutRef.once('value')).val();
  return about;
}