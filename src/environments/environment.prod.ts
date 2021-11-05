import { Module, Page } from '@utility/enum/route.enum';

export const environment = {
  production: true,
  defaultUrl: `${Module.User}/${Page.Chat}`,
  firebaseConfig: {
    apiKey: 'AIzaSyAJ-b0JwMjkqFkOTEQxBdKBCZFXCbzkf_Q',
    authDomain: 'f-coin-1bf5f.firebaseapp.com',
    projectId: 'f-coin-1bf5f',
    storageBucket: 'f-coin-1bf5f.appspot.com',
    messagingSenderId: '516639164071',
    appId: '1:516639164071:web:c7326f2d951b027c86fd82',
    measurementId: 'G-RY2EQ8FL6X',
  },
};
