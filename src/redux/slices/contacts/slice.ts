import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchMoreContacts} from './asyncActions'
import {ContactItem, ContactsSliceState} from './types'

const initialState: ContactsSliceState = {
    items: [],
    waiting: false,
    page: 1,
    query: ''
}

export const slice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.items = []
            state.query = action.payload
            state.page = 1
        },
        setContacts(state, action: PayloadAction<ContactItem[]>) {
            state.items = action.payload
            state.waiting = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoreContacts.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(fetchMoreContacts.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload]
            state.waiting = false
            state.page += 1
        })
        builder.addCase(fetchMoreContacts.rejected, (state) => {
            state.waiting = true
        })
    }
})
export const {setContacts, setQuery} = slice.actions

export default slice.reducer