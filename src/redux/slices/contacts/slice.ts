import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {addNewContact, changeContact, deleteContact, fetchContacts} from './asyncActions'
import {ContactsSliceState} from './types'

const initialState: ContactsSliceState = {
    items: [],
    waiting: false,
    query: ''
}

export const slice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        /**
         * Изменение поля фильтрации контактов по названию
         */
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
    },
    extraReducers: (builder) => {
        /**
         * Редюсеры fetchContacts
         */
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

        /**
         * Редюсеры addNewContact
         */
        builder.addCase(addNewContact.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(addNewContact.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload]
            state.waiting = false
        })
        builder.addCase(addNewContact.rejected, (state) => {
            state.waiting = false
        })

        /**
         * Редюсеры deleteContact
         */
        builder.addCase(deleteContact.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.waiting = false
        })
        builder.addCase(deleteContact.rejected, (state) => {
            state.waiting = false
        })

        /**
         * Редюсеры changeContact
         */
        builder.addCase(changeContact.pending, (state) => {
            state.waiting = true
        })
        builder.addCase(changeContact.fulfilled, (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    return {
                        id: item.id,
                        name: action.payload.name,
                        phone: action.payload.phone,
                        email: action.payload.email
                    }
                } else {
                    return item
                }
            })
            state.waiting = false
        })
        builder.addCase(changeContact.rejected, (state) => {
            state.waiting = false
        })
    }
})

export const {setQuery} = slice.actions

export default slice.reducer