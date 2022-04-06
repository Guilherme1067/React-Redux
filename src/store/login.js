import { createSlice, combineReducers } from '@reduxjs/toolkit';
import createAsyncSlice from './helper/createAsyncSlice';

const token = createAsyncSlice({
  name: 'token',
  fetchConfig: (user) => ({
    url: 'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  }),
});

const user = createAsyncSlice({
  name: 'user',
  fetchConfig: (token) => ({
    url: 'https://dogsapi.origamid.dev/json/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }),
});

// const fetchUser = (token) => async (dispatch) => {
//   try {
//     dispatch(fetchUserStarted());
//     const response = await fetch('https://dogsapi.origamid.dev/json/api/user', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const user = await response.json();
//     return dispatch(fetchUserSuccess(user));
//   } catch (error) {
//     return dispatch(fetchUserError(error.message));
//   }
// };

const reducer = combineReducers({ token: token.reducer, user: user.reducer });
const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;

export const login = (user) => {
  return async (dispatch) => {
    try {
      const { payload } = await dispatch(fetchToken(user));
      if (payload !== undefined) await dispatch(fetchUser(payload.token));
    } catch (error) {}
  };
};

export default reducer;
