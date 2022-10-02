// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: 'AIzaSyAK_8kV3vXp3E1z4mFHtIpLrJzxGl2TRZ0',
  authDomain: 'thrifty-ml.firebaseapp.com',
  projectId: 'thrifty-ml',
  storageBucket: 'thrifty-ml.appspot.com',
  messagingSenderId: '717808147715',
  appId: '1:717808147715:web:1040ce573db16f94085d36',
};

// home, signup, login, dashboard

export const environment = {
  production: false,
  firebase: {
    projectId: 'thrifty-ml',
    appId: '1:717808147715:web:1040ce573db16f94085d36',
    storageBucket: 'thrifty-ml.appspot.com',
    apiKey: 'AIzaSyAK_8kV3vXp3E1z4mFHtIpLrJzxGl2TRZ0',
    authDomain: 'thrifty-ml.firebaseapp.com',
    messagingSenderId: '717808147715',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
