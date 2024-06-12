// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3030/';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString();
        return `jobs?${queryString}`;
      },
    }),
    getJobById: builder.query({
      query: (id) => `jobs/${id}`,
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi;
