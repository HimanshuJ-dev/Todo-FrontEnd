export const GET_USERS_FETCH = "GET_USERS_FETCH";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const CREATE_USER_FETCH = "CREATE_USER_FETCH";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FETCH = "SIGN_OUT_FETCH";

export const getUsersFetch = (email, password) => ({
  type: GET_USERS_FETCH,
  payload: { email, password },
});

export const createUserFetch = (name, email, password) => ({
  type: CREATE_USER_FETCH,
  payload: { name, email, password },
});

export const signOutUser = () => ({
  type: SIGN_OUT_FETCH,
});
