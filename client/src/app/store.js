import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './authApiSlice'
import { experienceApi } from './experienceApiSlice'
import authReducer from './authApiSlice';
import { jobsApi } from './jobsApiSlice';
import { applicantsApi } from './applicantsApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [experienceApi.reducerPath]: experienceApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [applicantsApi.reducerPath]: applicantsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(experienceApi.middleware).concat(jobsApi.middleware).concat(applicantsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)