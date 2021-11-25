// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EModule, EUserPage } from '@utility/enum/route.enum';
import { UserPageMap } from '@utility/map/router.map';

export const environment = {
  production: false,
  defaultUrl: `${EUserPage.Chat}/${UserPageMap.get(EUserPage.Chat)?.path}`,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
