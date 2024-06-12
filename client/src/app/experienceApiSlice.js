import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3030/';

const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth.token
    // If we have a token set in state, let's assume that we should be passing it.
    console.log(token);
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
};

export const experienceApi = createApi({
  reducerPath: 'experienceApi',
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
  endpoints: (builder) => ({
    addExperience: builder.mutation({
      query(body) {
        return {
          url: `experiences`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteExperience: builder.mutation({
      query(id) {
        return {
          url: `experiences/${id}`,
          method: 'DELETE'
        };
      },
    }),
    modifyExperience: builder.mutation({
      query({ id, ...body }) {
        return {
          url: `experiences/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    getUserExperiences: builder.query({
      query: () => `experiences`,
    }),
    getUserInfoById: builder.query({
      query: (id) => `users/${id}`,
    }),
    getJobsByUserId: builder.query({
      query: (id) => `jobs?userId=${id}`,
    }),
    deleteJobById: builder.mutation({
      query(id) {
        return {
          url: `jobs?${id}`,
          method: 'DELETE',
        };
      },
    }),
    modifyJob: builder.mutation({
      query({ id, ...body }) {
        return {
          url: `jobs/${id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
  }),
});

export const { 
  useAddExperienceMutation, 
  useGetUserInfoByIdQuery, 
  useGetUserExperiencesQuery, 
  useDeleteExperienceMutation, 
  useModifyExperienceMutation , 
  useGetJobsByUserIdQuery,
  useDeleteJobByIdMutation,
  useModifyJobMutation,
} = experienceApi;
