// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const baseUrl = 'http://localhost:3030/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body) {
        return {
          url: `authentication`,
          method: 'POST',
          body,
        };
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: `users/register`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

const initialState = {
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  userId: localStorage.getItem('userId'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('userId', action.payload.userId);
    },
    clearToken(state) {
      state.token = null;
      state.role = null;
      state.userId = null
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId')
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = authApi;
