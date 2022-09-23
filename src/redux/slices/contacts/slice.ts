import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {addNewContact, changeContact, deleteContact, fetchContacts} from './asyncActions'
import {ContactItem, ContactsSliceState} from './types'

const initialState: ContactsSliceState = {
    items: [],
    waiting: false,
    query: ''
}

export const slice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
        setContacts(state, action: PayloadAction<ContactItem[]>) {
            state.items = action.payload
            state.waiting = true
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload
            state.waiting = false
        })
        builder.addCase(fetchContacts.rejected, (state) => {
            state.waiting = false
        })

        builder.addCase(addNewContact.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload]
            state.waiting = false
        })

        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.waiting = false
        })

        builder.addCase(changeContact.fulfilled, (state, action) => {
            state.items = state.items.map(item => {
                if(item.id === action.payload.id) {
                    return {
                        id: item.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        email: action.payload.email
                    }
                } else{
                    return item
                }
            })
            state.waiting = false
        })
    }
})

export const {setContacts, setQuery} = slice.actions

export default slice.reducer