import { PulupsBlack, PushupBlack, RunningBlack, SitupsBlack } from '../assets/svg';
import { hp } from './StyleGuide';

const SCREEN = {
  SPLASH: 'SplashScreen',
  MAIN_SPLASH: 'MAIN_SPLASH',
  LOGIN: 'LoginScreen',
  REGISTER: 'RegisterScreen',
  FORGET: 'ForgetPassword',
  ADMIN_REGISTER: 'AdminRegister',
  SELECT_LOCATION: 'SelectLocation',

  MEMBER_LIST: 'MemberListScreen',
  FRIEND_LIST: 'FriendListScreen',
  ALL_USERS: 'ALL_USERS',
  USER_FRIEND_REQ: 'USER_FRIEND_REQ',
  SELECT_ORGANIZATION: 'SELECT_ORGANIZATION',
  SEARCH: 'SearchScreen',
  HOME: 'Home',
  SURVEY: 'SurveyScreen',
  LEADER_BOARD: 'Leader-board',
  SCORE_BOARD: 'ScoreBoardScreen',
  POINT_SCORE: 'PointScoreScreen',
  PROFILE: 'ProfileScreen',
  REFERRAL: 'ReferralScreen',
  TAB: 'Tab',
  // NOTIFICATION: 'Notification',
  SEARCH: 'Search',
  MENU: 'Menu',
  GYM_HOME: 'GymHome',
  POST_COMMENTS: 'POST_COMMENTS',
  REPORT: 'ReportScreen',
  MAP: 'MapScreen',
  STORE: 'StoreScreen',

  CREATE_POST: 'CreatePost',
  CREATE_CLASS: 'CreateClass',
  REPORTED: 'ReportedIssues',
  ADD_WORKOUT: 'AddWorkout',
  CREATE_CHART: 'CreateChart',
  USER_RESULTS: 'UserResults',
  TEST_SCREEN: 'TestScreen',
  MEMBERS: 'MemberScreen',
  WORKOUT: 'WorkoutScreen',
  PROGRESSION: 'Progression',
  CLASSES: 'ClassesScreen',
  SEE_ALL: 'SeeAllScreen',

  USER_STACK: 'UserStack',
  ADMIN_STACK: 'AdminStack',
  ADMIN_TAB: 'AdminTab',
}
const En = {
  "BackArrow": "Back Arrow",
  "Setting": "Setting",
  "forgetWarning": "Please fill email and we’ll send you a link to get back into your account",
  "registerHeading": "Create an account and allows you to personalise your app",
  "registerConfirmation": "I read confirm T&C and privacy policy to continue the authorization access",
  "Loremipsum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "cancel": "Cancel",
  "video": "video",
  "multiImage": "multiImage"
}

const MemberList = [
  { name: 'Andrew Gaunfield', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Kathrine John', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Kathrine John', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Aliyana Roohe', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Andrew Gaunfield', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Kathrine John', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Kathrine John', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Aliyana Roohe', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Aliyana Roohe', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Aliyana Roohe', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
  { name: 'Aliyana Roohe', src: require('../assets/images/userImage.png'), location: 'Los Angeles, United States' },
]

const excSize = hp(3)

const ExerciseData = [
  { text: 'Pushups', value: '30', svg: { ...<PushupBlack height={excSize} width={excSize} /> } },
  { text: 'Pullups', value: '30', svg: { ...<PulupsBlack height={excSize} width={excSize} /> } },
  { text: 'Mile Run', value: '3', svg: { ...<RunningBlack height={excSize} width={excSize} /> } },
  { text: 'Situps', value: '20', svg: { ...<SitupsBlack height={excSize} width={excSize} /> } },
]

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const bloodData = [
  { label: 'A+', value: 'A+' },
  { label: 'B+', value: 'B+' },
  { label: 'AB+', value: 'AB+' },
  { label: 'O+', value: 'O+' },
  { label: 'A-', value: 'A-' },
  { label: 'B-', value: 'B-' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O-', value: 'O-' },
];

const MORE_DESIGN = {
  ORG_TEST: 'oranization_test',
  MY_TEST: 'my_test',
}

export {
  SCREEN, En, MemberList, ExerciseData, genderData, bloodData, MORE_DESIGN,
};
