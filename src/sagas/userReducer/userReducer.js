import {
    GET_USERS_FETCH,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    SIGN_OUT_FETCH,
    SIGN_OUT_SUCCESS,
    CREATE_USER_FETCH,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED
} from './userReducerActions'

const INITIAL_STATE = {
  currentUser: null,
  username: null,
  isLoading: false,
  errorUser: null,
};

export const signInReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        username: action.name,
        isLoading: false,
        errorUser: action.error,
      };
    case GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorUser: action.error,
      };
    case SIGN_OUT_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        username: null,
        isLoading: false,
      };
    case CREATE_USER_FETCH:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        username: action.name,
        isLoading: false,
        errorUser: action.error,
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errorUser: action.error,
      };
    default:
      return state;
  }
};