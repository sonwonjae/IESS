import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGZhS6hr6mcuQ0YAP_yRmpToogMVZVFHI',
  authDomain: 'iess-30a98.firebaseapp.com',
  projectId: 'iess-30a98',
  storageBucket: 'iess-30a98.appspot.com',
  messagingSenderId: '1091954782159',
  appId: '1:1091954782159:web:e3b4b70656a58e35caecba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function deleteAtPath(path) {
  var deleteFn = httpsCallable(getFunctions(app), 'recursiveDelete');
  deleteFn({ path: path })
    .then(function (result) {
      console.log('Delete success: ' + JSON.stringify(result));
    })
    .catch(function (err) {
      console.log('Delete failed, see console,');
      console.warn(err);
    });
}

export { app, auth, db, deleteAtPath };
