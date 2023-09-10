import { CustomerType, SolutionType } from '@components'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const solutionsApi = createApi({
  reducerPath: 'solutionsApit',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3121/api' }),
  tagTypes: ['Solution'],
  endpoints: builder => ({
    solutions: builder.query<SolutionType[], void>({
      query: () => '/solutions',
      providesTags: ['Solution'],
    }),
    solution: builder.query<SolutionType, string>({
      query: _id => `/solutions/${_id}`,
    }),
    addSolution: builder.mutation({
      query: solution => ({
        url: '/solutions',
        method: 'POST',
        body: solution,
      }),
      invalidatesTags: ['Solution'],
    }),
    updateSolution: builder.mutation<void, SolutionType>({
      query: ({ _id, ...rest }) => ({
        url: `/solutions/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Solution'],
    }),
    deleteSolution: builder.mutation({
      query: _id => ({
        url: `/solutions/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Solution'],
    }),
  }),
})

export const {
  useSolutionsQuery,
  useSolutionQuery,
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} = solutionsApi
