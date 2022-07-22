import {
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit"
import { Post, PostService } from "goodvandro-alganews-sdk"

interface PostSliceState {
  paginated?: Post.Paginated,
  fetching: boolean
}

const initialState: PostSliceState = {
  fetching: false,
  paginated: {
    page: 0,
    size: 5,
    totalElements: 0,
    totalPages: 1,
    content: [],
  }
}

export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async function (query: Post.Query) {
    const posts = await PostService.getAllPosts(query)
    return posts
  }
)

export const postReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.paginated = action.payload
    })
    .addMatcher(isPending, (state) => {
      state.fetching = true
    })
    .addMatcher(isFulfilled, (state) => {
      state.fetching = false
    })
    .addMatcher(isRejected, (state) => {
      state.fetching = false
    })
})
