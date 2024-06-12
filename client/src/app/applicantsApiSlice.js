import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3030/';

const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      console.log(token);
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
};

export const applicantsApi = createApi({
  reducerPath: 'applicantsApi',
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
  endpoints: (builder) => ({
    applyForJob: builder.mutation({
        query: (body) => ({
          url: 'applicants',
          method: 'POST',
          body,
        }),
    }),
    getUserJobsById: builder.query({
      query: (userId) => `applicants?userId=${userId}`,
    }),
  }),
    
});

export const { useApplyForJobMutation, useGetUserJobsByIdQuery } = applicantsApi;
