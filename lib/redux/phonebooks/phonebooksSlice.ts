import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { add, edit, load, remove } from './phonebooksApi'

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

export const addPhoneAsync = createAsyncThunk<FormResponse, NewUser>(
  'phonebooks/add',
  async ({ id, name, phone }) => {
    const response = await add(name, phone);
    return { id, user: response.data };
  }
);

export const editPhoneAsync = createAsyncThunk<FormResponse, NewUser>(
  'phonebooks/edit',
  async ({id, name, phone}) => {
    const response = await edit(id, name, phone)
    return {id, user: response.data}
  }
)

export const removePhoneAsync = createAsyncThunk(
  `phonebooks/remove`,
  async (id: string) => {
    const response = await remove(id)
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
      .addCase(addPhoneAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(addPhoneAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = [action.payload.user, ...state.value]
      })
      .addCase(editPhoneAsync.rejected, (state, action) => {
        state.status = 'idle'
        console.error('Failed to add user:', action.error.message);
      })
      .addCase(editPhoneAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(editPhoneAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = state.value.map((item: User) => {
          if (item.id === action.payload.id) {
            console.log(action.payload.user)
            item.name = action.payload.user.name
            item.phone = action.payload.user.phone
          }
          return item
        }) 
      })

      .addCase(removePhoneAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(removePhoneAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = state.value.filter(item => item.id !== action.payload.id)
      })
      .addCase(removePhoneAsync.rejected, (state, action) => {
        state.status = 'idle'
        console.error('Failed to remove user:', action.error.message);
      })
  }
})


export default phoneSlice.reducer