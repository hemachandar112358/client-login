import firebase from "firebase/app";
import "firebase/firestore";
import { combineReducers, compose, createStore } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";
import "firebase/auth";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

var firebaseConfig = {
  apiKey: "AIzaSyDWL0bogZpaBXVjuqlJ-7Eed8WQH_oE4Y0",
  authDomain: "banking-app-9fd19.firebaseapp.com",
  projectId: "banking-app-9fd19",
  storageBucket: "banking-app-9fd19.appspot.com",
  messagingSenderId: "478749078790",
  appId: "1:478749078790:web:2faeb88eddb8a483f0da87",
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});
firebase.firestore();
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export { rrfProps, store };
