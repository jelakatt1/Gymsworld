// const BASE_URL = 'https://theworkout.org/api/'
const BASE_URL = 'https://thegymsworld.com/api/'

const ROUTES = {
    //AUTH
    REGISTER: "register",
    LOGIN: "login",
    ORGANIZATON_LOGIN: "organization-login",
    FORGET_PASSWORD: "forget-password",
    RESET_PASSWORD: "reset-password",
    PROFILE_UPDATE: "profile-update",

    HOME_DATA: (userId) => `get-user-homepage-data?user_id=${userId}`,

    //USER - FRIENDS
    USER_FRIENDS: (userId) => `get-user-friends?user_id=${userId}`,
    ALL_USERS: "get-all-users",
    ALL_ORGANIZATONS: "get-all-organizations",
    ALL_NEARBY_OPEN_GYMS: "get-near-by-org-of-user",
    SEND_REQUEST: "send-friend-request",
    REMOVE_FRIEND: "remove-friend",
    GET_FRIEND_REQUESTS: (userId) => `get-user-friend-request?user_id=${userId}`,
    GET_USER_REFFERALS: (userId) => `user-referrals?user_id=${userId}`,
    ACCEPT_REQUEST: "add-friend",
    GET_ALL_WORKOUTS: "get-all-workouts",

    //USER - POSTS - ORG
    USER_ORGANIZATIONS: (userId) => `get-org-list-of-user?user_id=${userId}`,
    CREATE_POST: "create-post",

    USER_ECERCISES_LIST: "list-of-workouts",

    //PERSONAL WORKOUT
    ADD_USER_WORKOUT: "add-user-personal-workout",
    GET_ADDED_USER_WORKOUT: (userId) => `user-workout-list?user_id=${userId}`,
    // MY_BEST_WORKOUTS: (userId) => `user-top-workout-list?user_id=${userId}`,

    //ORGANIZATION - HOME
    ORGANIZATION_HOME: (orgId) => `get-org-post?org_id=${orgId}`,

    // Get Group admin
    ORGANIZATION_ADMIN: (orgId) => `get-org-admins?org_id=${orgId}`,
    ASSIGN_ROLE: `assign-role-to-user`,

    // POSTS
    LIKE_POST: "like-post",
    UNLIKE_POST: "unlike-post",
    ADD_COMMENT: "add-comment",

    // CLASS
    CREATE_CLASS: "create-class",
    CLASS: (orgId) => `get-classes?org_id=${orgId}`,

    // Tests
    CREATE_TEST_WORKOUT: "create-test-workout",
    TEST_WORKOUT: (orgId) => `org-test-workout-list?org_id=${orgId}`,
    // USER_TEST_WORKOUT: (userId) => `get-user-org-test?user_id=${userId}`,
    SUBMIT_TEST: `submit-user-test`,
    // SUBMITTED_TEST: (userId) => `get-user-submitted-test?user_id=${userId}`,

    // Report Problem
    REPORT_PROBLEM: 'report-problem',
    REPORTED_PROBLEM: (orgId) => `get-all-reports?org_id=${orgId}`,
    DELETE_PROBLEM: (testId) => `delete-report?test_id=${testId}`,

    LEADERBOARD: `user-leaderboard`,
    DELETE_USER: (userID) => `delete-account?user_id=${userID}`
}

const METHOD = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
}

export { BASE_URL, ROUTES, METHOD }