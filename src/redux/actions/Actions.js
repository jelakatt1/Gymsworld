import { TOKEN, USER , USER_EXERCISES, USER_BEST_EXERCISES, USER_ORGANIZATIONS, GYM_POSTEDCOMMENTS} from "./ActionTypes";

export const setUser = (data) => ({
    type: USER,
    payload: data,
});
export const setToken = (data) => ({
    type: TOKEN,
    payload: data,
});

export const setExercises = (data) => ({
    type: USER_EXERCISES,
    payload: data,
});

export const setBestExercises = (data) => ({
    type: USER_BEST_EXERCISES,
    payload: data,
});

export const setUserOrganizations = (data) => ({
    type: USER_ORGANIZATIONS,
    payload: data,
});

export const setGymPosts = (data) => ({
    type: GYM_POSTEDCOMMENTS,
    payload: data,
});