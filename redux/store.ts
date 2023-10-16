'use client'

import { configureStore } from '@reduxjs/toolkit'
// import cakeReducer from '@redux/features/cake/cakeSlice'
// import icecreamReducer from '../features/icecream/icecreamSlice'
// import userReducer from '../features/user/userSlice'
// import copySlice from './features/copy/copySlice'
import userSlice from './features/user/userSlice'
import counterSlice from '@redux/features/counter/counterSlice'
import customerSlice from '@redux/features/customer/customerSlice'
import solutionSlice from '@redux/features/solution/solutionSlice'
// import { solutionsApi } from '@services/solutionsApi'
import { extendedSolutionSlice } from '@query/features/solution/solutionSlice'
import { apiSlice } from '@query/features/api/apiSlice'

const store = configureStore({
  reducer: {
    customer: customerSlice,
    solution: solutionSlice,
    counter: counterSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
