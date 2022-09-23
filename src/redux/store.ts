import { configureStore } from '@reduxjs/toolkit'

import contactsSlice from './slices/contacts/slice'
import authenticationSlice from './slices/authentication/slice'

export const store = configureStore({
    reducer: {
        contactsSlice,
        authenticationSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch