import axios from '@components/axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { SolutionType } from '@utils/types/customer'

type InitialState = {
  loading: boolean
  solutions: SolutionType[]
  error: string
}
const initialState: InitialState = {
  loading: false,
  solutions: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchSolutions = createAsyncThunk('solution/fetchSolutions', async () => {
  return await axios
    .get('solutions')
    .then(response => response.data)
})

const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {}, // empty object is required as reducers is mandatory
  extraReducers: builder => {
    builder.addCase(fetchSolutions.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchSolutions.fulfilled,
      (state, action: PayloadAction<SolutionType[]>) => {
        state.loading = false
        state.solutions = action.payload
        state.error = ''
      })
    builder.addCase(fetchSolutions.rejected, (state, action) => {
      state.loading = false
      state.solutions = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default solutionSlice.reducer
