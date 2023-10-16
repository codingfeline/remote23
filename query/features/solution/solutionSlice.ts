import { apiSlice } from "../api/apiSlice";
import { SolutionType } from "@components";

export const extendedSolutionSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    solutions: builder.query<SolutionType[], void>({
      query: () => '/solutions',
      providesTags: ['Solution'],
    }),
    solutionNames: builder.query<SolutionType[], void>({
      query: () => '/solutions',
      transformResponse: (data: SolutionType[]) => {
        return data.map(s => s.name).sort()
      },
      providesTags: ['Solution'],
    }),
    solution: builder.query<SolutionType, string>({
      query: _id => `/solutions/${_id}`,
      providesTags: ['Solution'],
    }),
    addSolution: builder.mutation<{}, SolutionType>({
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
  })
})

export const {
  useSolutionsQuery,
  useSolutionNamesQuery,
  useSolutionQuery,
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} = extendedSolutionSlice
