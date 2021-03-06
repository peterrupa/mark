import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginUser: ['username', 'userId'],
  logout: null,
  requestLogout: null
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  userId: null,
  isLoggingOut: false
});

/* ------------- Reducers ------------- */

export const loginUser = (state, data) =>
  state.merge({ username: data.username, userId: data.userId });

export const logout = (state) =>
  state.merge(INITIAL_STATE);

export const requestLogout = (state) =>
  state.merge({ isLoggingOut: true });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_USER]: loginUser,
  [Types.LOGOUT]: logout,
  [Types.REQUEST_LOGOUT]: requestLogout
});
