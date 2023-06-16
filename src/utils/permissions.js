import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform, Alert, Linking } from 'react-native';
import { isIOS } from './myUtils';

// const handleLocationRequest = (callback) => {


//   const permission =
//     isIOS() ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

//   check(permission).then((result) => {
//     if (result === RESULTS.BLOCKED) {
//       Alert.alert(
//         'Location permission',
//         'Location permission is blocked in the device ' +
//         'settings. Allow the app to access location to ' +
//         'see location-based weather.',
//         [
//           {
//             text: 'OK',
//             onPress: () => {
//               Linking.openSettings()
//             },
//           },
//         ],
//       )
//       return
//     }
//     if (result === RESULTS.GRANTED) {
//       callback();
//     } else {
//       request(permission).then((result) => {
//         if (result === RESULTS.GRANTED) {
//           callback();
//         } else {
//         }
//       });
//     }
//   });
// };

const handleLocationRequest = (callBackf) => {
  check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ).then(result => {
    if (result === RESULTS.GRANTED) {
      callBackf();

    } else {
      request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result === RESULTS.GRANTED) {
          callBackf();


        }
        check(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ).then(result => {
          if (result === RESULTS.GRANTED) {
            callBackf();

          }
        });
      });
    }
  });
};

export { handleLocationRequest };