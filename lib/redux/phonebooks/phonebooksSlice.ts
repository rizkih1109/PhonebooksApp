import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { load } from './phonebooksApi'

interface UserState {
  value: User[],
  status: string
}

const initialState = { value: [], status: 'idle' } satisfies UserState as UserState

export const loadPhoneAsync = createAsyncThunk(
  'phonebooks/load',
  async () => {
    const response = await load()
    return response.data
  }
)

export const phoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadPhoneAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(loadPhoneAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload.Phonebooks.map((item: User) => {
          return item
        })
      })
      .addCase(loadPhoneAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.value = []
      })
  }
})


export default phoneSlice.reducer