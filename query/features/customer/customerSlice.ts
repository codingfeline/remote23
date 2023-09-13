import { apiSlice } from "../api/apiSlice";
import { CustomerType } from "@components";

export const extendedCustomerSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    customers: builder.query<CustomerType[], void>({
      query: () => '/customers',
      providesTags: ['Customer'],
    }),
    customer: builder.query<CustomerType, string>({
      query: _id => `/customers/${_id}`,
      providesTags: ['Customer'],
    }),
    addCustomer: builder.mutation<{}, CustomerType>({
      query: customer => ({
        url: '/customers',
        method: 'POST',
        body: customer,
      }),
      invalidatesTags: ['Customer'],
    }),
    updateCustomer: builder.mutation<void, CustomerType>({
      query: ({ _id, ...rest }) => ({
        url: `/customers/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Customer'],
    }),
    deleteCustomer: builder.mutation({
      query: _id => ({
        url: `/customers/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer'],
    }),
  })
})

export const {
  useCustomersQuery,
  useCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = extendedCustomerSlice
