import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

type Customer = {
  id: number
  name: string
}
type InitialState = {
  loading: boolean
  customers: Customer[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  customers: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', () => {
  return axios
    .get('https://remoteapi.nazs.net/api/customers')
    .then(response => response.data)
})

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {}, // empty object is required as reducers is mandatory
  extraReducers: builder => {
    builder.addCase(fetchCustomers.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchCustomers.fulfilled,
      (state, action: PayloadAction<Customer[]>) => {
        state.loading = false
        state.customers = action.payload
        state.error = ''
      }
    )
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false
      state.customers = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default customerSlice.reducer
