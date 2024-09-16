import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { add, load } from './phonebooksApi'

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

export const addPhoneAsync = createAsyncThunk<AddResponse, NewUser>(
  'phonebooks/add',
  async ({ id, name, phone }) => {
    const response = await add(name, phone)
    return { id, user: response.data }
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
      .addCase(addPhoneAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(addPhoneAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action.payload.user)
        state.value = [action.payload.user, ...state.value]
      })
      .addCase(addPhoneAsync.rejected, (state, action) => {
        state.status = 'idle'
        console.error('Failed to add user:', action.error.message);
      })
  }
})


export default phoneSlice.reducer