'use client'

import { configureStore } from '@reduxjs/toolkit'
// import cakeReducer from '@redux/features/cake/cakeSlice'
// import icecreamReducer from '../features/icecream/icecreamSlice'
// import userReducer from '../features/user/userSlice'
import counterReducer from '@redux/features/counter/counterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
