import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  value: []
}
const initialState: InitialState = {
  value: []
}

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<[]>) => {
      state.value = action.payload
      console.log(action.payload)
    }
  }
})

export default customerSlice.reducer
export const { setCustomers } = customerSlice.actions
