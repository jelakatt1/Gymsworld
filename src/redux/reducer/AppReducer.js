import { USER, TOKEN, USER_EXERCISES, USER_BEST_EXERCISES, USER_ORGANIZATIONS, GYM_POSTEDCOMMENTS } from "../actions/ActionTypes";

const initialState = {
    user: {},
    token: '',
    userExercisesList: [],
    userBestExercisesList: [],
    userOrganizations: [],
    gymPosts:[]
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            let userState = Object.assign({}, state);
            userState.user = action.payload;
            return userState;
        case TOKEN:
            let tokenState = Object.assign({}, state);
            tokenState.user = action.payload;
            return tokenState;

        case USER_EXERCISES:
            let exState = Object.assign({}, state);
            exState.userExercisesList = action.payload;
            return exState;

        case USER_BEST_EXERCISES:
            let bestExState = Object.assign({}, state);
            bestExState.userBestExercisesList = action.payload;
            return bestExState;

        case USER_ORGANIZATIONS:
            let userOrgState = Object.assign({}, state);
            userOrgState.userOrganizations = action.payload;
            return userOrgState;

            case GYM_POSTEDCOMMENTS:
                let postCommentsState = Object.assign({}, state);
                postCommentsState.gymPosts = action.payload;
                return postCommentsState;

        default:
            return state;
    }
};
export default appReducer;