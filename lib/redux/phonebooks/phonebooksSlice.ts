import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { add, avatar, edit, load, remove } from './phonebooksApi'

interface UserState {
  value: User[],
  status: string,
  keyword: string,
  sort: string,
  page: number,
  limit: number,
  hasMore: boolean
}

const initialState = { value: [], status: 'idle', keyword: '', sort: 'asc', page: 1, limit: 10, hasMore: true } satisfies UserState as UserState

export const loadPhoneAsync = createAsyncThunk(
  'phonebooks/load',
  async ({ keyword = '', sort = 'asc', page = 1, limit = 10 }: { keyword?: string, sort?: string, page?: number, limit?: number }) => {
    const response = await load(keyword, sort, page, limit)
    console.log('berhasil masuk')
    return { data: response.data, keyword, sort, page, limit }
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
  async ({ id, name, phone }) => {
    const response = await edit(id, name, phone)
    return { id, user: response.data }
  }
)

export const avatarPhoneAsync = createAsyncThunk<FormResponse, Avatar>(
  'phonebooks/avatar',
  async ({ id, file }) => {
    const response = await avatar(id, file)
    return { id, user: response.data }
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
        if (action.payload.page === 1) {
          state.value = action.payload.data.Phonebooks
          state.page = 1 
        } else {
          state.value = [...state.value, ...action.payload.data.Phonebooks];
        }
        state.page = action.payload.page
        state.hasMore = action.payload.data.Phonebooks.length === action.payload.limit
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
        const update = state.value.map((item: User) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              name: action.payload.user.name,
              phone: action.payload.user.phone
            }
          }
          return item
        })

        const searchUpdate = update.filter((item: User) => {
          const keyResult = state.keyword.toLowerCase()
          return (
            item.name.toLowerCase().includes(keyResult) ||
            item.phone.toLowerCase().includes(keyResult)
          )
        })

        const filterUpdate = searchUpdate.sort((a: User, b: User) => {
          if (state.sort === 'asc') return a.name.localeCompare(b.name);
          if (state.sort === 'desc') return b.name.localeCompare(a.name);
          return 0;
        });

        state.value = filterUpdate
      })
      .addCase(avatarPhoneAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(avatarPhoneAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = state.value.map((item: User) => {
          if (item.id === action.payload.id) {
            item.avatar = action.payload.user.avatar
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